export const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

export const login = (email: string) => {
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("loginTime", Date.now().toString());
  localStorage.setItem("userEmail", email);
};

export const signup = (email: string) => {
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("loginTime", Date.now().toString());
  localStorage.setItem("userEmail", email);
};

export const logout = () => {
  localStorage.clear();
};

export const checkAuth = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const loginTime = localStorage.getItem("loginTime");

  if (!isAuthenticated || !loginTime) {
    logout();
    return false;
  }

  const timeElapsed = Date.now() - parseInt(loginTime);
  if (timeElapsed > AUTO_LOGOUT_TIME) {
    logout();
    return false;
  }

  return true;
};

export const updateLoginTime = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  if (isAuthenticated) {
    localStorage.setItem("loginTime", Date.now().toString());
  }
};