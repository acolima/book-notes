function getToken() {
  const userJson = localStorage.getItem("auth");
  let user;

  if (userJson) {
    user = JSON.parse(userJson);

    return user.token;
  }
}

export { getToken };
