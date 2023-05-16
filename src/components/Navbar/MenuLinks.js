export const menuLinks = [
    {
      title: 'Home',                        // Normal Link Item
      path: '/',
      icon: '/icons/homeicon.png',
      icon_alt: 'Home'
    },
    {
      title: 'About Me',
      path: '/about',
      icon: '/icons/abouticon.png',
      icon_alt: 'About'
    },
    {
      title: 'Projects',                 // Dropdown Menu Item
      id: '1',
      icon: '/icons/projectsicon.png',
      icon_alt: 'Projects',
      subMenu: [                              // Dropdown Menus have a SubMenu containing all their links.
        {
          title: 'This Web App',
          path: '/projects/thiswebapp',
        },
        {
          divider: true                     // A dividing line between the links in the dropdown.
        },
        {
          title: 'Auth Project',
          path: '/projects/authproject',
        },
        {
          divider: true                     // A dividing line between the links in the dropdown.
        },
        {
          title: '1st Project',
          path: '/projects/firstproject',
        },
      ],
    },
    {
      title: 'Members Area',
      path: '/members/dashboard',
      icon: '/icons/abouticon.png',
      icon_alt: 'Members'
    },
    {
      title: 'Premium VIP Area',
      path: '/members/premium',
      icon: '/icons/abouticon.png',
      icon_alt: 'Premium'
    },
    {
      title: 'Blog',
      path: '/blog',
      icon: '/icons/blogicon.png',
      icon_alt: 'Blog'
    }
  ]
  
  // The Navbar Logo text on the left
  export const site = {
    title: 'MyWebsite'                    // Use this for just text and not the <Image /> logo. <Navbar.Brand href="/">{site.title}</Navbar.Brand>
  }