Merged Andys-Code NextJS app with self-written JWT login solution.

Issues:
- once an error message is set it remains even if you navigate away fromt hat page and come back. As the global state doesn't clear it.

errors since redux-persist installed:
- gsap not loading
- mfa-login.js "code" is not defined? Looking for the mfa code???