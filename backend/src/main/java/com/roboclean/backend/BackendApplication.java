package com.roboclean.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.File;
import java.nio.file.Files;
import java.util.List;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		// Load .env variables programmatically into System Properties
		try {
			File envFile = new File(".env");
			if (!envFile.exists()) {
				envFile = new File("backend/.env");
			}
			if (envFile.exists()) {
				List<String> lines = Files.readAllLines(envFile.toPath());
				for (String line : lines) {
					line = line.trim();
					if (!line.isEmpty() && !line.startsWith("#") && line.contains("=")) {
						int index = line.indexOf("=");
						String key = line.substring(0, index).trim();
						String value = line.substring(index + 1).trim();
						
						// Remove outer quotes if present
						if (value.startsWith("\"") && value.endsWith("\"") && value.length() > 1) {
							value = value.substring(1, value.length() - 1);
						} else if (value.startsWith("'") && value.endsWith("'") && value.length() > 1) {
							value = value.substring(1, value.length() - 1);
						}
						
						System.setProperty(key, value);
					}
				}
				System.out.println("[Dotenv] Local .env variables loaded successfully.");
			} else {
				System.out.println("[Dotenv] No local .env file detected.");
			}
		} catch (Exception e) {
			System.err.println("[Dotenv] Failed to load .env: " + e.getMessage());
		}

		SpringApplication.run(BackendApplication.class, args);
	}

}
