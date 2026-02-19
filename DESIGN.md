# Design System: Business Automation Assessment Platform

## 1. Brand Identity

**Brand Name:** Business Automation Readiness Assessment  
**Owner:** Gary - Business Automation Specialist  
**Personality:** Professional, Trustworthy, Results-Driven, Approachable

## 2. Color Palette

### Primary Colors
- **Primary Blue:** #2563EB - Main brand color, CTAs, links
- **Primary Dark:** #1D4ED8 - Hover states, emphasis
- **Primary Light:** #3B82F6 - Accents, highlights

### Score Colors
- **Red (0-59%):** #EF4444 - Building Foundation
- **Yellow (60-74%):** #F59E0B - Moderate Potential  
- **Green (75-100%):** #10B981 - High Potential

### Neutrals
- **Gray 900:** #111827 - Headings, primary text
- **Gray 700:** #374151 - Body text
- **Gray 500:** #6B7280 - Secondary text, labels
- **Gray 200:** #E5E7EB - Borders, dividers
- **Gray 100:** #F3F4F6 - Light backgrounds
- **White:** #FFFFFF - Primary background

### Backgrounds
- **Primary BG:** #FFFFFF - Main content areas
- **Secondary BG:** #F9FAFB - Alternating sections
- **Dark BG:** #111827 - Hero overlay, footers

## 3. Typography

### Font Family
**Primary:** Inter (sans-serif)
- Highly readable
- Modern and professional
- Excellent at all sizes

### Type Scale
- **Display (Hero):** 48px / 3rem - Bold, Line Height 1.2
- **H1:** 36px / 2.25rem - Bold, Line Height 1.3
- **H2:** 30px / 1.875rem - Semibold, Line Height 1.3
- **H3:** 24px / 1.5rem - Semibold, Line Height 1.4
- **H4:** 20px / 1.25rem - Semibold, Line Height 1.4
- **Body Large:** 18px / 1.125rem - Regular, Line Height 1.6
- **Body:** 16px / 1rem - Regular, Line Height 1.6
- **Small:** 14px / 0.875rem - Regular, Line Height 1.5
- **Tiny:** 12px / 0.75rem - Regular, Line Height 1.5

## 4. Spacing System

**Base Unit:** 4px

- **xs:** 4px (0.25rem)
- **sm:** 8px (0.5rem)
- **md:** 12px (0.75rem  )
- **base:** 16px (1rem)
- **lg:** 24px (1.5rem)
- **xl:** 32px (2rem)
- **2xl:** 48px (3rem)
- **3xl:** 64px (4rem)
- **4xl:** 80px (5rem)
- **5xl:** 96px (6rem)

**Section Padding:** 64px vertical, 24px horizontal (mobile), 48px horizontal (desktop)

## 5. Component Styles

### Buttons

**Primary CTA:**
- Background: Primary Blue (#2563EB)
- Color: White
- Padding: 12px 32px (0.75rem 2rem)
- Border Radius: 8px (0.5rem)
- Font Weight: 600 (Semibold)
- Font Size: 16px
- Hover: Darker blue, slight lift (2px), shadow
- Transition: All 0.2s

**Secondary:**
- Background: White
- Border: 2px solid Primary Blue
- Color: Primary Blue
- Same padding and radius as primary

### Cards

**Value Proposition Cards:**
- Background: White
- Border: 2px solid Gray 200 (#E5E7EB)
- Border Radius: 0 (square)
- Padding: 32px (2rem)
- Box Shadow: None (default)
- Hover: Border becomes Primary Blue, subtle shadow

**Testimonial Card:**
- Background: White or Light Gray
- Padding: 32px
- Border Radius: 12px
- Subtle shadow: 0 4px 12px rgba(0, 0, 0, 0.08)

### Forms

**Input Fields:**
- Height: 48px
- Border: 1px solid Gray 200
- Border Radius: 6px
- Padding: 12px 16px
- Focus: Border becomes Primary Blue, blue outline
- Font Size: 16px

**Labels:**
- Font Size: 14px
- Font Weight: 500
- Color: Gray 700
- Margin Bottom: 6px

### Modals

**Backdrop:**
- Background: rgba(0, 0, 0, 0.5)
- Backdrop blur: 4px

**Modal Container:**
- Background: White
- Border Radius: 16px
- Padding: 40px
- Max Width: 500px
- Box Shadow: 0 20px 60px rgba(0, 0, 0, 0.3)

## 6. Design System Notes for Stitch Generation

When generating pages for this site, use this design language:

**Color Usage:**
- Primary actions and CTAs: Bold blue (#2563EB)
- Headings: Dark gray (#111827)
- Body text: Medium gray (#374151)
- Borders and dividers: Light gray (#E5E7EB)

**Typography:**
- All text uses Inter font family
- Headings are bold or semibold
- Body text is regular weight
- Generous line spacing (1.6 for body text)

**Layout:**
- Clean, generous whitespace
- Sections alternate between white and very light gray backgrounds
- Full-width sections with max-width centered content containers
- Content max-width: 1200px

**Components:**
- Cards have square borders (no rounded corners on value prop cards)
- Buttons are rounded (8px border radius)
- Primary buttons are solid blue with white text
- Hover states include subtle shadows and color darkening

**Visual Hierarchy:**
- Large, bold headings that stand out
- Short paragraphs with clear spacing
- Visual breaks between sections
- Strong contrast between text and backgrounds

**Interactive Elements:**
- All buttons have hover effects (color change, lift, shadow)
- Links are underlined on hover
- Form inputs highlight on focus
- Smooth transitions (0.2-0.3s)

**Mobile Considerations:**
- Stack layouts vertically on small screens
- Maintain touch-friendly button sizes (minimum 44px)
- Reduce padding on mobile
- Single column layouts below 768px

**Imagery:**
- Professional photography
- Circular or rounded avatars for people
- Full-width hero images with dark overlay for text readability

**Spacing:**
- Section vertical padding: 64px (4rem)
- Element spacing: 24-32px between major elements
- Card internal padding: 32px (2rem)
- Consistent margins throughout

Generate pages that feel professional, trustworthy, and conversion-focused. The design should build credibility while maintaining a clean, modern aesthetic. Every element should serve the goal of guiding users toward taking the assessment.
