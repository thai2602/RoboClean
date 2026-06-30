package com.roboclean.backend.config;

import com.roboclean.backend.entity.Faq;
import com.roboclean.backend.entity.Product;
import com.roboclean.backend.entity.Review;
import com.roboclean.backend.repository.FaqRepository;
import com.roboclean.backend.repository.ProductRepository;
import com.roboclean.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import java.math.BigDecimal;

@Configuration
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private FaqRepository faqRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public void run(String... args) throws Exception {
        seedProducts();
        seedFaqs();
        seedReviews();
    }

    private void seedProducts() {
        if (productRepository.count() == 0) {
            Product pro = Product.builder()
                    .name("RoboClean Pro Max X2")
                    .sku("ROBO-PRO-X2")
                    .price(new BigDecimal("12990000"))
                    .originalPrice(new BigDecimal("14990000"))
                    .description("Đầy đủ trạm sạc thông minh 6-trong-1, tự giặt và sấy khô giẻ lau bằng khí nóng.")
                    .imageUrl("/images/roboclean_hero.png")
                    .specifications("{\"suctionPower\":\"6000Pa\",\"battery\":\"5200mAh\",\"dustbinCapacity\":\"350ml\",\"waterTank\":\"4L (Station)\"}")
                    .active(true)
                    .build();

            Product standard = Product.builder()
                    .name("RoboClean Standard S1")
                    .sku("ROBO-STD-S1")
                    .price(new BigDecimal("7990000"))
                    .originalPrice(new BigDecimal("9990000"))
                    .description("Lực hút 4000Pa cực mạnh, kèm dock sạc cơ bản tự thu gom rác.")
                    .imageUrl("/images/roboclean_hero.png")
                    .specifications("{\"suctionPower\":\"4000Pa\",\"battery\":\"3200mAh\",\"dustbinCapacity\":\"350ml\",\"waterTank\":\"N/A\"}")
                    .active(true)
                    .build();

            Product dock = Product.builder()
                    .name("Trạm Sạc Đa Năng RoboDock")
                    .sku("ROBO-DOCK-PRO")
                    .price(new BigDecimal("4990000"))
                    .originalPrice(new BigDecimal("5990000"))
                    .description("Nâng cấp dock sạc thường thành tự động đổ rác, tự giặt giẻ tiện lợi.")
                    .imageUrl("/images/roboclean_dock.png")
                    .specifications("{\"compatibility\":\"Pro Series\",\"dustbag\":\"3L\",\"tank\":\"4L clean / 4L dirty\"}")
                    .active(true)
                    .build();

            productRepository.save(pro);
            productRepository.save(standard);
            productRepository.save(dock);

            System.out.println("[Seeder] 3 products seeded successfully.");
        }
    }

    private void seedFaqs() {
        if (faqRepository.count() == 0) {
            Faq faq1 = Faq.builder()
                    .question("Pin của robot dùng được bao lâu trong một lần sạc?")
                    .answer("RoboClean Pro sở hữu pin dung lượng cao 5200mAh, cho phép hoạt động liên tục tối đa 180 phút trong một lần sạc ở chế độ tiêu chuẩn, đủ để làm sạch diện tích sàn lên tới 250m².")
                    .displayOrder(1)
                    .build();

            Faq faq2 = Faq.builder()
                    .question("Robot có tránh được dây điện, giầy dép và đồ chơi trẻ em không?")
                    .answer("Có! Nhờ hệ thống cảm biến LiDAR AI 3D tiên tiến và camera quét laser, RoboClean Pro có khả năng nhận diện các vật thể nhỏ từ 1cm như dây sạc điện thoại, đồ chơi, giầy dép để chủ động tránh xa mà không bị mắc kẹt.")
                    .displayOrder(2)
                    .build();

            Faq faq3 = Faq.builder()
                    .question("Chế độ sấy khô giẻ lau hoạt động như thế nào?")
                    .answer("Sau khi robot tự làm sạch giẻ lau tại trạm sạc, hệ thống sấy khí nóng 55°C sẽ tự động kích hoạt. Khí nóng tuần hoàn thổi đều vào giẻ trong vòng 2 giờ giúp sấy khô hoàn toàn, ngăn mùi hôi, nấm mốc và vi khuẩn phát triển.")
                    .displayOrder(3)
                    .build();

            Faq faq4 = Faq.builder()
                    .question("Tôi có cần tự châm nước sạch và đổ nước bẩn thường xuyên không?")
                    .answer("Trạm sạc RoboDock sở hữu bình chứa nước sạch 4L và bình chứa nước bẩn 4L. Bạn chỉ cần châm nước sạch và đổ nước bẩn sau khoảng 5-7 ngày sử dụng thông thường. Đồng thời túi chứa bụi 3L ở dock sạc có thể giữ bụi tới 60 ngày mới cần thay.")
                    .displayOrder(4)
                    .build();

            Faq faq5 = Faq.builder()
                    .question("Chính sách bảo hành và hỗ trợ kỹ thuật tại Việt Nam như thế nào?")
                    .answer("RoboClean cung cấp chế độ bảo hành chính hãng 24 tháng đối với robot và dock sạc. Chúng tôi cam kết 1 đổi 1 trong vòng 30 ngày nếu có lỗi từ nhà sản xuất, hỗ trợ kỹ thuật và giao nhận bảo hành tại nhà hoàn toàn miễn phí.")
                    .displayOrder(5)
                    .build();

            faqRepository.save(faq1);
            faqRepository.save(faq2);
            faqRepository.save(faq3);
            faqRepository.save(faq4);
            faqRepository.save(faq5);

            System.out.println("[Seeder] 5 FAQs seeded successfully.");
        }
    }

    private void seedReviews() {
        if (reviewRepository.count() == 0) {
            Review r1 = Review.builder()
                    .customerName("Nguyễn Hoàng Nam")
                    .rating(5)
                    .comment("Robot hút bụi Pro Max này quá tuyệt vời. Nhà tôi nuôi 3 con mèo lông rụng ngập tràn nhưng từ khi có em này, sàn nhà bóng loáng. Hệ thống sấy khô giẻ khí nóng hoạt động hoàn hảo, không có mùi hôi.")
                    .build();

            Review r2 = Review.builder()
                    .customerName("Trần Thị Minh Anh")
                    .rating(5)
                    .comment("Thực sự rảnh tay! Trước dùng dòng cũ phải tự tháo giẻ giặt phơi, dòng này tự lo từ A đến Z. Cứ 2 tháng tôi mới phải đi đổ rác từ túi đựng của dock sạc một lần.")
                    .build();

            Review r3 = Review.builder()
                    .customerName("Phạm Minh Hoàng")
                    .rating(4)
                    .comment("Dù bản Standard không tự giặt giẻ nhưng lực hút 4000Pa cực kỳ mạnh, hút thảm rất sạch. App điều khiển vẽ bản đồ rất nhanh và chính xác.")
                    .build();

            reviewRepository.save(r1);
            reviewRepository.save(r2);
            reviewRepository.save(r3);

            System.out.println("[Seeder] 3 reviews seeded successfully.");
        }
    }
}
