package com.splitandconquer.api.controllers;

import com.splitandconquer.api.ApiApplication;
import com.splitandconquer.api.models.Balance;
import com.splitandconquer.api.models.Payment;
import com.splitandconquer.api.models.User;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author petry
 */
@RestController
public class PaymentController {
    // private static ArrayList<Payment> allPayments = new ArrayList<Payment>();
    
    // @GetMapping("/payments")
    // public ArrayList<Payment> getPayments() {
    //    return PaymentController.allPayments;
    // }

    @PostMapping("/create-payment")
    public CreatePaymentResponse createPayment(@RequestBody Payment payment) {
        // PaymentController.allPayments.add(payment);
        User loggedUser = ApiApplication.getLoggedUser();
        Balance balance;
        float amount = payment.amount();

        if (payment.payerId() != payment.receiverId()) {
            if (loggedUser.getId() == payment.payerId()) {
                if (loggedUser.getBalanceByUser(payment.receiverId()) == null) {
                    return new CreatePaymentResponse(false, "Erro: recebidor inexistente.");
                }
                
                balance = loggedUser.getBalanceByUser(payment.receiverId());
            } else {
                if (loggedUser.getId() == payment.receiverId()) {
                    if (loggedUser.getBalanceByUser(payment.payerId()) == null) {
                        return new CreatePaymentResponse(false, "Erro: pagante inexistente.");
                    }
                    
                    balance = loggedUser.getBalanceByUser(payment.payerId());
                    amount = -amount;
                } else {
                    return new CreatePaymentResponse(false, "Erro: apenas implementado pagamento quando o pagante ou o recebidor são o usuario logado.");
                }
            }
        } else {
            return new CreatePaymentResponse(false, "Erro: não permitido realizar pagamento entre o mesmo usuário.");
        }
        
        balance.updateAmount(amount);
        return new CreatePaymentResponse(true, "Pagamento realizado com sucesso.");
    }
}

record CreatePaymentResponse(boolean success, String message) { }
