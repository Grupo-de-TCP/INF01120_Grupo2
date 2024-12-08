package com.splitandconquer.api.controllers;

import com.splitandconquer.api.ApiApplication;
import com.splitandconquer.api.models.Balance;
import com.splitandconquer.api.models.Expense;
import com.splitandconquer.api.models.ExpenseBody;
import com.splitandconquer.api.models.Group;
import com.splitandconquer.api.models.User;
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
    public static ExpenseResponse createExpense(@RequestBody ExpenseBody expense) {
        User loggedUser = ApiApplication.getLoggedUser();
        
        Group group = GroupController.findGroup(expense.groupId());
        if (group == null) {
            return new ExpenseResponse(false, "Erro: grupo nao existe.");
        }
        
        User payer = group.findMember(expense.payerId());
        if (payer == null) {
            return new ExpenseResponse(false, "Erro: pagante nao existe.");
        }
        
        int[] participantsId = expense.participants();
        if (participantsId.length <= 0) {
            return new ExpenseResponse(false, "Erro: nenhum participante foi informado.");
        }
        
        float splitAmount = expense.amount() / participantsId.length;
        splitAmount = (float)Math.round(splitAmount * 100) / 100;
        
        ArrayList<User> participants = new ArrayList<User>();
        for (int participantId : expense.participants()) {
            User participant = group.findMember(participantId);
            
            if (participant == null) {
                return new ExpenseResponse(false, "Erro: participante nao existe.");
            }
            
            if (loggedUser.getId() == payer.getId()) {
                if (loggedUser.getId() != participant.getId()) {
                    Balance balance = loggedUser.getBalanceByUser(participant.getId());
                    balance.updateAmount(splitAmount);
                }
            } else if (loggedUser.getId() == participant.getId()) {
                Balance balance = loggedUser.getBalanceByUser(payer.getId());
                balance.updateAmount(-splitAmount);
            }
            
            participants.add(participant);
        }
        
        int expenseId = group.getExpenses().size();
        Expense newExpense = new Expense(expenseId, payer, expense.title(), expense.amount(), participants);
        group.addExpense(newExpense);
        
        return new ExpenseResponse(true, "Despesa criada com sucesso!");
    }
}

record ExpenseResponse(boolean success, String message) { }
