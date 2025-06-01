import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

const errorRate = new Rate("errors");
const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export const options = {
	stages: [
		{ duration: "1m", target: 10 },
		{ duration: "30s", target: 200 },
		{ duration: "1m", target: 200 },
		{ duration: "30s", target: 10 },
		{ duration: "1m", target: 10 },
		{ duration: "30s", target: 0 },
	],
	thresholds: {
		http_req_failed: ["rate<0.1"],
		errors: ["rate<0.1"],
	},
};

export default function () {
	// Simulate quick user interactions during spike
	const quickActions = [
		() => {
			const response = http.get(`${BASE_URL}/en`);
			check(response, {
				"spike homepage success": (r) => r.status === 200,
			}) || errorRate.add(1);
		},
		() => {
			const response = http.get(`${BASE_URL}/en?page=2`);
			check(response, {
				"spike pagination success": (r) => r.status === 200,
			}) || errorRate.add(1);
		},
		() => {
			const response = http.get(`${BASE_URL}/el`);
			check(response, {
				"spike locale success": (r) => r.status === 200,
			}) || errorRate.add(1);
		},
		() => {
			const searchTerm = ["dev", "mgr", "eng"][Math.floor(Math.random() * 3)];
			const response = http.get(`${BASE_URL}/en?search=${searchTerm}`);
			check(response, {
				"spike search success": (r) => r.status === 200,
			}) || errorRate.add(1);
		},
	];

	// Execute random quick action
	const action = quickActions[Math.floor(Math.random() * quickActions.length)];
	action();

	// Minimal sleep during spike test
	sleep(Math.random() * 0.5 + 0.2); // 0.2-0.7 seconds
}
