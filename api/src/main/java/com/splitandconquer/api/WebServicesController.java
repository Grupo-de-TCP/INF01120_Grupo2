package com.splitandconquer.api;

import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author petry
 */
@RestController
public class WebServicesController {
    
    private static final String template = "Bem-vindo à API do Split&Conquer, %s!";
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/sobre")
    public Greeting greeting(@RequestParam(value = "nome", defaultValue = "(nome)") String name) {
        return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }
}
