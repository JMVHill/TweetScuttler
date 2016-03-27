package tweetscuttler;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Test {

    @RequestMapping("/greeting")
    public String greeting() {
        return "Hello TR";
    }
}