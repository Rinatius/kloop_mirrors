# Overview

This is a simple web application called "Зеркало Клоопа" (Kloop Mirror) that converts original Kloop.kg URLs to mirror site URLs. The application provides a user-friendly interface where users can paste a Kloop.kg URL and receive a corresponding mirror link. It's built as a client-side application using vanilla HTML, CSS, and JavaScript with Bootstrap for styling.

# Recent Changes

**September 10, 2025**: Created complete web application "Зеркало Клоопа"
- Implemented HTML structure with Bootstrap responsive design
- Added URL conversion logic that transforms kloop.kg URLs to mirror format
- Created mobile-friendly interface with Russian language support
- Set up static file server for development and testing
- **Updated**: Added support for second domain (ky.kloop.asia) with multi-domain validation
- **Enhanced UX**: Input field auto-clears after conversion and displays original URL for reference

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses a simple client-side architecture with three main components:
- **HTML Structure**: Single-page application with a centered card layout containing input field, button, and result display areas
- **Styling**: Bootstrap 5.3.0 for responsive design and custom CSS for enhanced visual appeal
- **JavaScript Logic**: Vanilla JavaScript for URL validation, conversion, and DOM manipulation

## Design Patterns
- **Single Responsibility**: Each function handles a specific task (URL conversion, validation, error display)
- **Progressive Enhancement**: Basic HTML form that's enhanced with JavaScript functionality
- **Responsive Design**: Mobile-first approach using Bootstrap's grid system

## URL Processing Logic
The application validates input URLs to ensure they:
- Are properly formatted URLs
- Belong to the kloop.kg domain
- Can be successfully converted to mirror format

## Error Handling
- Input validation with user-friendly error messages in Russian
- Try-catch blocks for URL parsing errors
- Visual feedback through Bootstrap alert components

## User Interface
- Clean, modern design with gradient buttons and subtle shadows
- Russian language interface targeting the intended user base
- Accessibility considerations with proper form labels and focus states

# External Dependencies

## CSS Framework
- **Bootstrap 5.3.0**: Loaded via CDN for responsive layout, form controls, and UI components

## Browser APIs
- **URL API**: Used for URL parsing and validation
- **DOM API**: For dynamic content manipulation and event handling

## No Backend Dependencies
This is a purely client-side application with no server-side components, databases, or external API calls required for basic functionality.