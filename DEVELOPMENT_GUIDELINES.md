# NexBank Development Guidelines

## Architecture Principles

### Overall Structure
- Follow modern web application patterns and best-practices
- Put as much of the app in the frontend as possible
- The backend should only be responsible for data persistence and making API calls
- Minimize the number of files
- Collapse similar components into a single file
- If the app is complex and requires functionality that can't be done in a single request, it is okay to stub out the backend and implement the frontend first

## Data Models & Types

### Schema Definition
- Always think through and generate the data model first in `shared/schema.ts` to ensure consistency between frontend and backend
- Do this before writing any other code
- Keep the data model as simple as possible (e.g. don't add createdAt and updatedAt fields unless it is strictly necessary)

### Schema Components
For each model, write:
1. The insert schema using `createInsertSchema` from `drizzle-zod`
   - Use `.omit` to exclude any auto-generated fields
2. The insert type using `z.infer<typeof insertSchema>`
3. The select type using `typeof table.$inferSelect`

### Common Pitfalls to Avoid
- When writing array columns in the Drizzle schema, always call `.array()` as a method on the column type, not as a wrapper function
  - ✓ Correct: `text().array()`
  - ✗ Wrong: `array(text())`

## Storage Layer

### Preference
- Always prefer using in-memory storage (MemStorage) unless you are asked to use a database
- Make sure to update `IStorage` in `server/storage.ts` to accommodate any storage CRUD operations you need in the application
- Ensure that storage interface uses the types from `@shared/schema.ts`

## Backend Implementation

### Routes
- After writing the storage interface, write the API routes in the `server/routes.ts` file
- Always use the storage interface to do any CRUD operations
- Keep the routes as thin as possible
- Validate the request body using Zod schemas from `drizzle-zod` before passing it to the storage interface

## Frontend Implementation

### Routing
- Use `wouter` for routing on the frontend
- If you need to add a new page, add them to the `client/src/pages` directory and register them in `client/src/App.tsx`
- If there are multiple pages, use a sidebar for navigation
- Use the `Link` component or the `useLocation` hook from `wouter` instead of modifying the window directly

### Forms
- Always use shadcn's `useForm` hook and `Form` component from `@/components/ui/form` which wraps `react-hook-form`
- When appropriate, use the `zodResolver` from `@hookform/resolvers/zod` to validate the form data using the appropriate insert schema from `@shared/schema.ts`
- Use `.extend` to add validation rules to the insert schema
- Remember that the form component is controlled, ensure you pass default values to the `useForm` hook

### Data Fetching
- Always use `@tanstack/react-query` when fetching data
- When appropriate, ensure you strongly type the query using the appropriate select type from `@shared/schema.ts`
- Queries should not define their own queryFn as the default fetcher is already set up to work with the backend
- Mutations should use apiRequest from `@lib/queryClient` to make POST/PATCH/DELETE requests to the backend
  - Always make sure to invalidate the cache by queryKey after a mutation is made
  - Don't forget to import `queryClient` from `@lib/queryClient`
  - For hierarchical or variable query keys use an array for cache segments so cache invalidation works properly
    - ✓ Correct: `queryKey: ['/api/recipes', id]`
    - ✗ Wrong: `queryKey: [`/api/recipes/${id}`]`
- Show a loading or skeleton state while queries (via `.isLoading`) or mutations (via `.isPending`) are being made
- The template uses TanStack Query v5 which only allows the object form for query related functions
  - ✓ Correct: `useQuery({ queryKey: ['key'] })`
  - ✗ Wrong: `useQuery(['key'])`

### Common Frontend Pitfalls
- The `useToast` hook is exported from `@/hooks/use-toast`
- If a form is failing to submit, try logging out `form.formState.errors` to see if there are form validation errors for fields that might not have associated form fields
- DO NOT explicitly import React as the existing Vite setup has a JSX transformer that does it automatically
- Use `import.meta.env.<ENV_VAR>` to access environment variables on the frontend instead of `process.env.<ENV_VAR>`
  - Note that variables must be prefixed with `VITE_` in order for the env vars to be available on the frontend
- `<SelectItem>` will throw an error if it has no value prop
  - ✓ Provide a value prop like this: `<SelectItem value="option1">`

### Accessibility & Testing
- Add a `data-testid` attribute to every HTML element that users can interact with (buttons, inputs, links, etc.) and to elements displaying meaningful information (user data, status messages, dynamic content, key values)
- Use unique, descriptive identifiers following this pattern:
  - Interactive elements: `{action}-{target}` (e.g., `button-submit`, `input-email`, `link-profile`)
  - Display elements: `{type}-{content}` (e.g., `text-username`, `img-avatar`, `status-payment`)
- For dynamically generated elements (lists, grids, repeated components), append a unique identifier at the end: `{type}-{description}-{id}`
  - Examples: `card-product-${productId}`, `row-user-${index}`, `text-price-${itemId}`
  - The dynamic identifier can be any unique value (database ID, index, key) as long as it's unique within that group
- Keep test IDs stable and descriptive of the element's purpose rather than its appearance or implementation details

## Styling & Theming

### Custom CSS Properties
- When defining custom properties in `index.css` that will be used by a tailwind config, always use H S% L% (space separated with percentages after Saturation and Lightness) and do NOT wrap in hsl()
  - Example: `--my-var: 23 10% 23%;`

### CSS Customization
- Analyze the comments inside of `index.css` to determine how to set colors
- Replace every color placeholder with an appropriate color
- Do NOT forget to replace every single instance
- Pay attention to what you see in `index.css` as well as the `design_guidelines.md` file

### Imports & Icons
- Use the `@`-prefixed paths to import shadcn components and hooks
- Use icons from `lucide-react` to signify actions and provide visual cues
- Use `react-icons/si` for company logos

### Assets
- User may attach assets (images, etc.) in their request
- If the user asks you to include attached assets in the app, you can reference them in the frontend with the `@assets/...` import syntax
- For example, if the user attached asset is at `attached_assets/example.png`, you can reference it in the frontend with `import examplePngPath from "@assets/example.png"`

### Dark Mode
1. Set `darkMode: ["class"]` in tailwind.config.ts and define color variables in :root and .dark CSS classes
2. Create ThemeProvider with useState("light"), useEffect to toggle "dark" class on document.documentElement, and localStorage sync
3. When not using utility class names configured in `tailwind.config.ts`, always use explicit light/dark variants for ALL visual properties:
   - `className="bg-white dark:bg-black text-black dark:text-white"`
4. When using utility classes configured in tailwind config, you can assume these already been configured to automatically adapt to dark mode

## Universal Design Guidelines

### Important Color Convention
Any time you make changes to `index.css` by adding/modifying color variables that are then used in tailwind config, always use H S% L% (space separated with percentages after Saturation and Lightness) and do NOT wrap in hsl().

Then if referencing those colors in tailwind config, configure like:
```css
foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
```

### DOM Usage
- Ignore any browser warnings about buttons being nested inside of other buttons - it actually is not a problem at all

### Emoji
- Never use emoji - Not for application UI, not for test/mock data, never
- If you need to use an emoji for something like a "reaction" in a social media/chat application, you should be using the proper icon library instead because those can be styled with the --foreground colors
- Do not just replace emojis with text - you usually want a proper icon instead

### Layout Rules
- Layout changes should never occur on hover interactions
  - If an element is hidden until some hover action occurs, use `visibility:hidden` instead of `display:none`
  - Changing display property on hover can induce a layout change
- Elements should never change their size when hovered
- Elements should never be rendered/removed upon hover - it should always be present and its visibility property should be toggled
- Any element with position: sticky (or the "sticky" tailwind class) should also have a very very high z-index (higher than anything else in the page)
- If using Tailwind justify-between, justify-around, or justify-evenly, you MUST also apply either space-x-* or gap Tailwind classes
- Horizontal flex rows with justify-start, justify-end (or no justify-*) should ALWAYS include flex-wrap
- NEVER use display:table or equivalent tailwind utilities
- If a "left nav" or "right nav" have a header, and the main column also has a header, the sizes of those two headers should be exactly equal

### Element Dimensions
There are two classes of elements for which height, padding, and text size should NEVER be configured through manually specifying (like h-8 px-1 h-9):
1. **Interactable controls** - controls that are clickable, or text inputs that are focusable
2. **Pills, badges, and "tokens"** - tend to not be interactable but are visually distinguished from the text/controls around them

Badges and tokens should have a smaller height than interactable controls, so use the small size Badges.

ALWAYS remember that interactable controls on the same horizontal line should be the same height.

Button component has the following heights for its size variants:
- default (or no size specified): min-h-9
- sm: min-h-8
- lg: min-h-10
- icon: h-9

### Consistency
- Spacing should be consistent - if you have various panels/card elements, they should all have the same padding around their inner content unless you have a strong justification for deviating
- In general there should only be a few levels of spacing used: small, medium, and large
- If a text input has an embedded icon, there should be the "small" amount of space to its left and right
- No two elements that have visual borders and/or elevated hover states should be touching - there must be spacing between them
- The application should be opinionated about whether or not it seeks a flat design or a bordered design

### Text Color
- Never use text-primary class for primary colored text (unless it is over a Hero image or some special branding case)
- The application should use three levels of text color to convey hierarchy of information:
  - Default: Used for most text
  - Secondary: Used for additional information
  - Tertiary: Used for the least important information
- Text colors must always take into account the colors of the surface they are rendered on
  - Light text should never be rendered on a light background
  - Darker text should never be rendered on a dark background
  - Double, even triple check that you have satisfied this requirement

### Heroes
- Landing pages often have large hero images
- The problem is that it is hard to switch light mode and dark mode and have the mode's standard text be readable on top of it
- The solution is to create a dark "wash" gradient over the image
- Always create a dark wash and render lighter text over that image regardless of dark vs. light mode
- You can also use variant="primary" buttons, or variant="outline" buttons with blurred backgrounds over the image
- This approach will work even with a dark/light toggle feature

### Drop Shadows
- Drop shadows should be used sparingly - and subtly, if at all
- There are two valid use cases for drop shadows:
  1. On elements/surfaces that have the same exact background color as the background they sit on top of
  2. To convey a sense of "floating" (e.g., modal, toast notification)

### Borders and Background Colors
- Border radii should ALWAYS be small unless you are creating a perfect circle element, or a perfect "pill" shape
- If using tailwind, use `rounded-md` class
- If there is enough contrast between the background and an element, then a border is not necessary
  - In this case, since a border is not necessary, if you do include a border, it will be one perceivable shade darker than the darkest color it touches (if in light mode) or one perceivable shade lighter than the lighest color it touches (if in dark mode)

### Container Styling Approaches
Some elements act as "panes", "panels" or "containers". There are four approaches to styling these "containers", which should inform your choice of colors in `index.css`:

**A. Using white space and font size + headings to convey hierarchy**
**B. Using background color of the container**
**C. Using borders/shadows around the container with no background-color on the container or a background color that is the exact same as its parent's background color**
**D. Using a background color and border around the container**

Whichever method (A, B, C, D) you choose, you should strive to use the same approach consistently throughout the application design, only deviating where there is a good justification or when the user requests it.

- If using method B, the container background color should be very subtly "elevated" in contrast against the background it sits on top of - just enough contrast to distinguish a boundary, but not enough to draw too much attention
- Method C is used when the container background color is the exact same as the background it sits on top of - in this case, the border or drop shadow should be very subtle
- If using method D, the border color should have a barely perceivable contrast to the background color of the container and the container background color should have a barely perceivable contrast against the background color it sits on top of
- Avoid using manually selected background colors such as `bg-yellow-400` because these will not look correct in dark mode - use semantic shadcn tokens when possible
- If you *must* use literal colors, always include dark variants in the class list for all backgrounds, borders, and foregrounds
- You can still rely on `hover:elevate` etc to appropriately highlight these colors even if they are manually selected

### Interactions
- If elements transform (scale etc) upon interactions such as hover or press down (active state), the transform should be extremely subtle - just enough to notice that it's happening
- For Buttons and Badges (Shadcn components) the hover and active states are already preconfigured automatically regardless of which variant you use
- You do not need to supply additional classes to these components to implement hover/active interactions
- Exception: The user explicitly requests otherwise

### Elevation Utilities
There are two special tailwind utility classes defined in `index.css`:
- **hover-elevate**: Applies a subtle elevation upon hover
- **active-elevate-2**: Applies a more dramatic elevation upon press-down

These utility classes:
- Will NOT work with overflow-hidden/overflow-scroll and MUST NOT be used in conjunction with overflow-hidden/scroll
- Prepare a component for hover/active elevation interaction
- Apply elevation of the background color (or even transparency!) that respects the current dark/light theme
- Compose well with any background color you apply to any element (or even lack of background!)

**To make an item "elevated" upon hover**: apply the `hover-elevate` tailwind class
**To make an item even more "elevated" upon press-down**: apply the `active-elevate-2` tailwind class

**Rules:**
- `<Button>`s and `<Badge>`s already apply hover-elevate and active-elevate-2
- For `<Button>`s and `<Badge>`s you should NEVER EVER apply any hover/active states that change their background/foreground colors
- If you have `hover:bg-*` on a button or interactable control that is a major RED FLAG
- If you want to make some *other* element besides those appear elevated you can apply the "hover-elevate" tailwind utility, or "active-elevate-2" utilities
- For example, if you use a `<Card>` you can do `<Card className="hover-elevate">` (avoid overusing on `<Card>`s)
- NEVER EVER try to apply your own hover or active colors for any element whatsoever
- You can select a custom background color, and then use the provided elevation utilities - they compose with custom background colors

### Toggle Elements
- You can turn any element into a "toggle" element using the elevate system
- This includes regular `<Button>`s and works in conjunction with hover-elevate/active-elevate-2
- To make an element toggleable, add the class "toggle-elevate"
- Then when the element should be considered "on", add another class "toggle-elevated" (not the 'd' at the end)

### Component Use

#### Shadcn Components
- ALWAYS use the default Shadcn components inside of `client/src/components` when there already exists a reusable base component
- Exception: When the user explicitly tells you to use something else or do something that is not supported by the base Shadcn components
- Use the existing `<Card>`, `<Button>`, and `<Badge>` components instead of creating your own or styling your own elements

#### Sidebar
- If your application would benefit from a Sidebar to organize pages or content, you MUST use the existing Shadcn sidebar primitives (in `@/components/ui/sidebar`)
- If you implement a side-navigation/sidebar experience, you MUST use the built-in Sidebar component
- NEVER reimplement your own unless the user explicitly asks you to NOT use the Shadcn sidebar
- NEVER set the width on a `<Sidebar/>` component directly
- Instead always set a css style property on the SidebarProvider:
  ```tsx
  let style = {
    "--sidebar-width": "20rem",       // default is 16rem
    "--sidebar-width-icon": "4rem",   // default is 3rem
  };
  <SidebarProvider style={style as React.CSSProperties}>
  ```
- You MUST supply w-full to the element that is the immediate child of SidebarProvider

#### Button Variants & Sizing
- The built-in `<Button>` component has several size/color variants
- All of the Button/Badge variants have support for automatically adjusting their background colors upon hover/active interactions using the hover-elevate and active-elevate-2 classes
- Even if custom background classes are added to them, the interactions are configured to look aesthetically pleasing regardless of context
- There is NEVER a need to implement different hover/active colors for `<Button>`s in a header, sidebar, or `<Card>s` - or anywhere else for that matter
- You MUST rely on the built-in hover/active interactions in Buttons and Badges, instead of trying to implement your own
- Exception: The user explicitly requests otherwise

#### Custom Button Backgrounds
- Occasionally you may need to set the background color of a `<Button>` to be something unique and not one of the default variants
- In that case, STILL do not try to implement hover/active interactions
- The built-in interactions of `<Button>`/`<Badge>` will work out of the box, for any variant, any background color, and any context

#### Card Component
- You MUST use the built-in Shadcn `<Card>` component to create card-like background/borders instead of applying your own styling
- Never nest a Card (or bg-card) inside of another Card (or bg-card)
- Exception: The user explicitly asks you to deviate from this

#### Cards Inside Sidebars
- A Card component should never be used *as* a Sidebar or stretch the full width or height of a sidebar/header
- This would cause the rounded corners of a `<Card>` to be touching the edge of a sidebar/header
- You MAY have a `<Card>`, `<Button>` or any other rounded element/component as one child among many others that exist inside of a Sidebar
- But there MUST be padding inside of the sidebar/header so that the `<Card>`/`<Button>`'s edges never touch the container's edges
- In the case of nesting a `<Card>` inside of a sidebar, header, or any other panel that is not the default background color:
  - You MUST configure the color scheme so that there is at least a small amount of contrast between the container background color and the `<Card>` background color
- In the case of nesting a `<Button>` inside of a sidebar, header, or any other panel/container:
  - You do NOT need to ensure there is minimal contrast because there are suitable button variants (ghost, outline, default) that adapt or look great on any background color
  - The one exception is "secondary" which tends to not have enough contrast when placed on arbitrary background colors
  - Try to only place secondary variant buttons on default background colors or card background colors

#### Avatar
- Use the existing Shadcn Avatar components (or Radix Avatar) unless the user requests that you use something different
- Don't forget to adhere to image-borders guidelines

#### Borders on Rounded Elements
- You should NEVER apply border to one, two, or three sides of an element/component when that element/component is "rounded"
- This looks terrible
- For example, `<Card>`s, `<Badge>`s, and `<Button>`s are rounded by default
- So applying just a `border-l-4` to this will look sloppy
- If an element or component has rounding of any kind, only use a full border around all four sides, or don't use a border at all
- Furthermore, the `<Button>`, `<Card>` and `<Badge>` components already implement their own borders so there is no need to apply even a thin border

#### Badge Behavior
- All `<Badge>`s are already configured to not wrap white space and their overflow is hidden by default
- You do not need to further configure that - all their contents will be on one line
- Expect this - they MUST be placed in locations where they have sufficient room to grow in width

#### Icon Buttons
- If using a Button that only has an "icon" inside of it, use `<Button size="icon" />`
- Do not try to create Buttons to hold icons with h-6 w-6 or similar configuration
- You won't be able to configure them correctly
- When using size="icon" do not specify the width and height to try to resize it
- All icon buttons should have the default widths and heights determined by size="icon"
- The moment you see `size="icon"` in a Button - you KNOW that there should NOT be any h-x or w-x classes added

#### Textarea
- If using a Shadcn `<Textarea />` component do NOT reset the padding to zero
- ✗ Wrong: `className="resize-none border-0 p-0 text-base focus-visible:ring-0"`
- ✓ Correct: `className="resize-none border-0 text-base focus-visible:ring-0"`

## SEO Implementation

- Ensure every page has a unique, descriptive title tag
  - Example: "Product Name - Category | Site Name"
- Add meta descriptions that summarize page content concisely
  - Example: "Discover our premium widget collection with free shipping on orders over $50. Shop our durable, eco-friendly products today."
  - Example: "Learn how to implement SEO best practices with our step-by-step guide. Includes practical tips for beginners and advanced techniques."
- Implement Open Graph tags for better social media sharing appearance

## Running the Project

- The workflow named 'Start application' is already setup and runs `npm run dev` which starts an Express server for the backend and a Vite server for the frontend
- After making edits, the workflow will automatically be restarted for you

## Forbidden Changes

### Never Modify These Files
- **NEVER** modify the existing Vite setup (`server/vite.ts` and `vite.config.ts`)
  - It is already configured to serve the frontend and backend on the same port and handles all the necessary setup for you
  - Don't add a proxy to the Vite server
  - All the aliases are already set up for you to import, don't modify them
- **NEVER** edit `package.json`:
  - If you find yourself stuck and need to modify the scripts, ask the user before doing so
  - If you need to install packages, use the packager_install_tool
- **NEVER** edit 'drizzle.config.ts'
