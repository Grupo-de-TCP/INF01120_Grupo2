package com.splitandconquer.api.controllers;

import com.splitandconquer.api.ApiApplication;
import com.splitandconquer.api.models.Expense;
import com.splitandconquer.api.models.Group;
import com.splitandconquer.api.models.User;
import com.splitandconquer.api.payloads.ExpensePayload;
import com.splitandconquer.api.responses.PostResponse;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author petry
 */
@RestController
public class ExpenseController {
    @PostMapping("/create-expense")
    public static PostResponse createExpense(@RequestBody ExpensePayload expensePayload) {
        Group group = GroupController.findGroup(expensePayload.groupId());
        if (group == null) {
            return new PostResponse(false, "Erro: grupo nao existe.");
        }
        
        User payer = group.findMember(expensePayload.payerId());
        if (payer == null) {
            return new PostResponse(false, "Erro: pagante nao existe.");
        }
        
        int numParticipants = expensePayload.participants().length;
        if (numParticipants <= 0) {
            return new PostResponse(false, "Erro: nenhum participante foi informado.");
        }
        
        ArrayList<User> participants = ExpenseController.montaListaParticipantes(expensePayload, group);
        if (participants == null) {
            return new PostResponse(false, "Erro: algum participante inválido foi informado.");
        }
        
        ExpenseController.updateBalances(expensePayload, participants);
        
        int expenseId = group.getCurrentExpenseId();
        Expense newExpense = new Expense(expenseId, payer, expensePayload.title(), expensePayload.amount(), participants);
        group.addExpense(newExpense);
        
        return new PostResponse(true, "Despesa criada com sucesso!");
    }
    
    /** 
     * Retorna um ArrayList com as instâncias de Usuario correspondentes aos IDs do payload
     */ 
    private static ArrayList<User> montaListaParticipantes(ExpensePayload expensePayload, Group group) {
        ArrayList<User> participants = new ArrayList<User>();

        for (int participantId : expensePayload.participants()) {
            User participant = group.findMember(participantId);
            
            if (participant == null) {
                return null;
            }
            
            participants.add(participant);
        }
        
        return participants;
    }
    
    /** 
     * Atualiza o Balance do usuário logado com os participantes da despesa, dividindo o amount entre os participantes
     */ 
    private static void updateBalances(ExpensePayload expensePayload, ArrayList<User> participants) {
        User loggedUser = ApiApplication.getLoggedUser();
        
        int numParticipants = expensePayload.participants().length;

        float splitAmount = expensePayload.amount() / numParticipants;
        splitAmount = (float)Math.round(splitAmount * 100) / 100; // Arredonda para duas casas decimais

        for (User participant : participants) {
            loggedUser.updateDividend(expensePayload.payerId(), participant.getId(), splitAmount);
        }
    }
}
