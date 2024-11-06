# create shared library

`nx g @nx/react:library shared-ui`

# add button
`npx shadcn@latest add button`

# add navigation menu
`npx shadcn@latest add navigation-menu`

# add popover
`npx shadcn@latest add popover`

# add calendar
`npx shadcn@latest add calendar`

# add input
`npx shadcn@latest add input`

# add form
`npx shadcn@latest add form`

# add organism
`nx g @nx/react:library organism`

# add header in organism
`nx g @nx/react:component header --project=organism --directory="organism/src/lib/header"`

# add video card in organism
`nx g @nx/react:component video-card --project=organism --directory="organism/src/lib/video-card"`

# add mobile detect in organism
`nx g @nx/react:component mobile-detect --project=organism --directory="organism/src/lib/mobile-detect"`

# add basic banner in organism
`nx g @nx/react:component basic-banner --project=organism --directory="organism/src/lib/basic-banner"`

# add small card in organism
`nx g @nx/react:component small-card --project=organism --directory="organism/src/lib/small-card"`

# add experiences page to milka project
`npx nx generate @nx/next:page --name=experiences --directory=/apps/milka/src/app/experiences --style=scss --nameAndDirectoryFormat=as-provided`

# add component list page to milka project
`npx nx generate @nx/next:page --name=component-list --directory=/apps/milka/src/app/component-list --style=scss --nameAndDirectoryFormat=as-provided`

# add registration Club in organism
`npx nx g @nx/react:component registration-club --project=organism --directory="organism/src/lib/registration-club"`

# add register login in organism
`npx nx g @nx/react:component register-login --project=organism --directory="organism/src/lib/register-login"`