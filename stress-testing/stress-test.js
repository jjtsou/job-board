import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

const errorRate = new Rate("errors");
const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export const options = {
	stages: [
		{ duration: "2m", target: 20 },
		{ duration: "2m", target: 50 },
		{ duration: "2m", target: 100 },
		{ duration: "5m", target: 100 },
		{ duration: "2m", target: 50 },
		{ duration: "2m", target: 20 },
		{ duration: "2m", target: 0 },
	],
	thresholds: {
		http_req_failed: ["rate<0.05"],
		errors: ["rate<0.05"],
	},
};

export default function () {
	const scenarios = [
		// Scenario 1: Homepage browsing (40% of users)
		() => {
			const response = http.get(`${BASE_URL}/en`);
			check(response, {
				"homepage loaded": (r) => r.status === 200,
			}) || errorRate.add(1);
			sleep(Math.random() * 3 + 1); // 1-4 seconds
		},

		// Scenario 2: Search and browse (35% of users)
		() => {
			const searchTerms = [
				"developer",
				"manager",
				"designer",
				"engineer",
				"analyst",
				"consultant",
			];
			const searchTerm =
				searchTerms[Math.floor(Math.random() * searchTerms.length)];

			let response = http.get(`${BASE_URL}/en?search=${searchTerm}`);
			check(response, {
				"search completed": (r) => r.status === 200,
			}) || errorRate.add(1);

			sleep(2);

			const page = 3;
			response = http.get(`${BASE_URL}/en?search=${searchTerm}&page=${page}`);
			check(response, {
				"pagination worked": (r) => r.status === 200,
			}) || errorRate.add(1);

			sleep(2);
		},

		// Scenario 3: Multi-language browsing (20% of users)
		() => {
			const locales = ["en", "el"];
			const locale = locales[Math.floor(Math.random() * locales.length)];

			let response = http.get(`${BASE_URL}/${locale}`);
			check(response, {
				"locale page loaded": (r) => r.status === 200,
			}) || errorRate.add(1);

			sleep(2);

			// Switch locale
			const otherLocale = locale === "en" ? "el" : "en";
			response = http.get(`${BASE_URL}/${otherLocale}`);
			check(response, {
				"locale switch success": (r) => r.status === 200,
			}) || errorRate.add(1);

			sleep(2);
		},

		// Scenario 4: Heavy pagination (5% of users)
		() => {
			for (let page = 1; page <= 5; page++) {
				const response = http.get(`${BASE_URL}/en?page=${page}`);
				check(response, {
					[`page ${page} loaded`]: (r) => r.status === 200,
				}) || errorRate.add(1);
				sleep(0.5);
			}
		},
	];

	// Select scenario based on probability
	const rand = Math.random();
	if (rand < 0.4) {
		scenarios[0]();
	} else if (rand < 0.75) {
		scenarios[1]();
	} else if (rand < 0.95) {
		scenarios[2]();
	} else {
		scenarios[3]();
	}
}
