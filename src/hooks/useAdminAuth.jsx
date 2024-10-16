const useAdminAuth = () => {
	const isAdminAuthed = JSON.parse(localStorage.getItem("isAdminLoggedIn"));
	if (isAdminAuthed) {
		return true;
	}
	else {
		return false;
	}
}

export default useAdminAuth;