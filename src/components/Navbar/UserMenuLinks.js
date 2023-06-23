// These are the links for a logged in user
// On the right hand side of the page.
// Dropdown menu

export const userMenuLinks = [
    {
      title: 'Dropdown Menu',                 // Dropdown Menu Item
      id: '1',
      subMenu: [                              // Dropdown Menus have a SubMenu containing all their links.
        {
          title: 'Profile',
          path: '/members/profile',
        },
        {
          divider: true                     // A dividing line between the links in the dropdown.
        },
        {
          title: 'Contact Us',
          path: '/members/contact',
        }
      ],
    }
  ]
  