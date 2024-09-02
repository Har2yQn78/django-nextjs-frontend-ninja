const NavLinks = [
    {
        label: "Dashboard",
        authRequired: false,
        href: "/"

    },
       {
        label: "Waitlists",
        authRequired: true,
        href: "/waitlists"

    }
]

export const NotUserLinks = [
    {
        label: "SignUp",
        authRequired: false,
        href: "/signup"

    },
       {
        label: "Login",
        authRequired: false,
        href: "/login"

    }
]


export default NavLinks
