const BASE_URL = "http://localhost:8080";

export async function signup(userData) {
  const response = await fetch(`${BASE_URL}/api/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("회원가입 실패");
  }

  return response.json();
}

export async function login(loginData) {
  const response = await fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error("로그인 실패");
  }

  return response.json();
}