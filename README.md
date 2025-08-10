Responsive Motivational Quote Web App – Task Summary & Audit Report

Objective:
Transform a desktop-only HTML page into a mobile-friendly layout using CSS media queries, while adding JavaScript interactivity for an engaging experience.

⸻

Implementation Steps
	1.	Base Content:
	•	Built a motivational quotes web app that displays an inspirational quote each time the page loads or the user clicks “New Quote”.
	•	Added an Auto-rotate feature to show new quotes every 15 seconds.
	•	Implemented a Share button to copy quotes to the clipboard.
	2.	Responsive Design:
	•	Used @media (max-width: 768px) and @media (max-width: 480px) for tablets and mobile screens.
	•	Converted fixed-width elements into flexible layouts using percentages and max-width.
	•	Made images responsive with max-width: 100%; height: auto;.
	•	Collapsed the navigation into a vertical stack for smaller screens.
	3.	Testing Method (MacBook):
	•	Opened project in VS Code and ran with Live Server.
	•	Used Chrome DevTools → Device Toolbar (⌘ Command + Shift + M) to test on multiple device presets.
	•	Checked layout changes on different screen widths, and verified keyboard accessibility (Tab navigation, “n” key for new quote).

Performance Breakdown:
	•	FCP (First Contentful Paint): +9
	•	LCP (Largest Contentful Paint): +22
	•	TBT (Total Blocking Time): +30
	•	CLS (Cumulative Layout Shift): +25
	•	SI (Speed Index): +10

⸻

Outcome & Learning
	•	Media Queries: Learned to adapt designs for multiple screen sizes using breakpoints.
	•	Flexible Layouts: Avoided fixed pixel widths, improved image scaling, and ensured text reflowed gracefully.
	•	Mobile-First Thinking: Started design from small screens and scaled up.
	•	Testing Skills: Used Chrome DevTools effectively for responsive design checks.
	•	Interactivity: Enhanced static content with JavaScript for better user engagement.
	•	Audit Insights: Achieved high accessibility and SEO scores while maintaining strong performance, proving the design is both user-friendly and mobile-optimized.
