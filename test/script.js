import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1000,
  iterations: 1000,
};

export default function() {
  let res = http.post("https://1nqdfd.deta.dev/send", JSON.stringify({
    name: "Ritul Singh",
    mobileNumber: 9205732793,
    email: "ritulsingh00@gmail.com"
  }), {
    headers: {
      "Content-Type": "application/json"
    }
  });

  check(res, {
    "status was 200": (r) => r.status == 200,
    // "transaction time OK": (r) => r.timings.duration < 500
  });

  sleep(1);
}

