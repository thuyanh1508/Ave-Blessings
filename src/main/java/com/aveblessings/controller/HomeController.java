package com.aveblessings.controller;

import com.aveblessings.model.Product;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import java.util.List;
import java.util.stream.Collectors;

@Controller
public class HomeController {

    private static final List<Product> PRODUCTS = List.of(
        new Product(
            1,
            "結婚式ウェブ招待状 #01",
            "日本風のデザインを取り入れた、創造的でロマンチックな結婚式用のウェブ招待状です。",
            1800,
            "invitation",
            "デモ",
            "Wedding #01",
            "/templates/wedding-01/index.html",
            5.0,
            128,
            "結婚式ウェブ招待状 #01 は Ave Blessings のデモテンプレートです。シンプルで上品な配色と、披露宴の日時・会場案内などの情報ブロックを備え、ゲストを温かく迎えるデザインになっています。",
            List.of(
                "和風の上品で温かいデザイン",
                "写真・日時・会場情報を組み込めるレイアウト",
                "名前やメッセージの簡単編集が可能",
                "スマートフォンでも美しく表示されます"
            )
        ),
        new Product(
            2,
            "誕生日メッセージカード",
            "名前やメッセージを入れられる、やさしい雰囲気の誕生日カードです。",
            500,
            "card",
            "電子カード",
            "Birthday",
            null,
            4.0,
            84,
            "名前やメッセージを入れられる、やさしい雰囲気の誕生日カードです。",
            List.of(
                "シンプルでかわいいデザイン",
                "名前とメッセージを自由に編集",
                "メールやSNSですぐ共有可能",
                "印刷・保存にも対応"
            )
        ),
        new Product(
            3,
            "結婚式招待状",
            "結婚式やパーティーに使える、上品なデジタル招待状です。",
            1200,
            "invitation",
            "招待状",
            "Wedding",
            "/templates/wedding-01/index.html",
            5.0,
            96,
            "結婚式やパーティーに向けた、上品で使いやすいデジタル招待状です。親しい方々へイベントの詳細を美しく案内できます。",
            List.of("デモ用の説明テキスト", "上品な招待状スタイル", "カスタムメッセージとギャラリー対応", "ウェブ・モバイル表示に最適化")
        ),
        new Product(
            4,
            "お祝いメッセージカード",
            "卒業、就職、記念日など、大切な節目に送るカードです。",
            700,
            "card",
            "お祝いカード",
            "Blessing",
            null,
            4.0,
            62,
            "卒業、就職、記念日など、大切な節目に送るカードです。感謝と祝福を、温かく静かな言葉で伝えられます。",
            List.of("節目のメッセージに最適", "色合いとレイアウトを自由に選択", "簡単に送信して共有可能", "個別のメッセージを追加可能")
        ),
        new Product(
            5,
            "告白メッセージ動画",
            "想いをやさしく伝える、短いオリジナル動画ギフトです。",
            2000,
            "video",
            "動画ギフト",
            "Love",
            null,
            5.0,
            71,
            "想いをやさしく伝える、短いオリジナル動画ギフトです。大切な相手に伝えたい気持ちを、温かな映像で表現します。",
            List.of("短時間で感情を届ける演出", "BGM とテキストを自由に組み合わせ", "共有リンク付きで簡単に配信", "スマホで見やすいレイアウト")
        )
    );

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/products")
    public String products(@org.springframework.web.bind.annotation.RequestParam(value = "category", required = false) String category,
                           Model model) {
        List<Product> list = PRODUCTS;
        if (category != null && !category.isBlank()) {
            list = PRODUCTS.stream().filter(p -> category.equals(p.getCategory())).collect(Collectors.toList());
        }
        model.addAttribute("products", list);
        model.addAttribute("selectedCategory", category == null ? "" : category);
        return "products";
    }

    @GetMapping("/cart")
    public String cart(Model model, HttpSession session) {
        @SuppressWarnings("unchecked")
        Map<Integer, Integer> cart = (Map<Integer, Integer>) session.getAttribute("cart");

        List<com.aveblessings.model.CartItem> items = new ArrayList<>();
        int total = 0;
        if (cart != null) {
            for (Map.Entry<Integer, Integer> e : cart.entrySet()) {
                int pid = e.getKey();
                int qty = e.getValue();
                Optional<Product> prodOpt = PRODUCTS.stream().filter(p -> p.getId() == pid).findFirst();
                if (prodOpt.isPresent()) {
                    Product p = prodOpt.get();
                    com.aveblessings.model.CartItem ci = new com.aveblessings.model.CartItem(p, qty);
                    items.add(ci);
                    total += ci.getSubtotal();
                }
            }
        }

        model.addAttribute("cartItems", items);
        model.addAttribute("cartTotal", total);
        return "cart";
    }

    @PostMapping("/cart/add")
    public String addToCart(@RequestParam("id") int id,
                            @RequestParam(value = "quantity", defaultValue = "1") int quantity,
                            HttpSession session,
                            RedirectAttributes redirectAttributes) {

        @SuppressWarnings("unchecked")
        Map<Integer, Integer> cart = (Map<Integer, Integer>) session.getAttribute("cart");
        if (cart == null) {
            cart = new HashMap<>();
        }

        cart.put(id, cart.getOrDefault(id, 0) + Math.max(1, quantity));
        session.setAttribute("cart", cart);

        redirectAttributes.addFlashAttribute("message", "商品をカートに追加しました。");
        return "redirect:/cart";
    }

    @PostMapping("/cart/remove")
    public String removeFromCart(@RequestParam("id") int id,
                                 HttpSession session,
                                 RedirectAttributes redirectAttributes) {

        @SuppressWarnings("unchecked")
        Map<Integer, Integer> cart = (Map<Integer, Integer>) session.getAttribute("cart");
        if (cart != null) {
            cart.remove(id);
            session.setAttribute("cart", cart);
        }

        redirectAttributes.addFlashAttribute("message", "カートから商品を削除しました。");
        return "redirect:/cart";
    }

    @GetMapping("/products/{id}")
    public String productDetail(@PathVariable int id, Model model) {

        Product product = PRODUCTS.stream().filter(p -> p.getId() == id).findFirst().orElse(null);
        if (product == null) {
            return "redirect:/products";
        }

        List<Product> related = PRODUCTS.stream()
            .filter(p -> p.getId() != id && p.getCategory().equals(product.getCategory()))
            .limit(3)
            .collect(Collectors.toList());

        model.addAttribute("product", product);
        model.addAttribute("related", related);

        return "product-detail";
    }
}