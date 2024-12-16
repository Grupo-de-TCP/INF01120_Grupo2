package com.splitandconquer.api.controllers;

import com.splitandconquer.api.ApiApplication;
import com.splitandconquer.api.models.User;
import com.splitandconquer.api.payloads.PaymentPayload;
import com.splitandconquer.api.responses.PostResponse;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author petry
 */
@RestController
public class PaymentController {
    @PostMapping("/create-payment")
    public static PostResponse createPayment(@RequestBody PaymentPayload paymentPayload) {
        User loggedUser = ApiApplication.getLoggedUser();
        boolean pagamentoRealizado = loggedUser.updateDividend(paymentPayload.payerId(), paymentPayload.receiverId(), paymentPayload.amount());

        if (!pagamentoRealizado) {
            return new PostResponse(false, "Erro: balanco entre os usuarios informados nao encontrado.");
        }
        
        return new PostResponse(true, "Pagamento realizado com sucesso!");
    }
}
