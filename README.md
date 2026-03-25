# UserPortal
A simple Angular application that fetches and displays user data from a public REST API with search, pagination, and user detail view.

# Setup Instructions

Follow these steps to run the project locally:

```
# Clone the repository
git clone <your-repo-url>

# Navigate into the project
cd UserPortal

# Install dependencies
npm install

# Run the application
ng serve

Open your browser and navigate to:

http://localhost:4200
```

## Features Implemented
- Built using Angular 18 with standalone components
- Fetch user data from public REST API
- Display data using Angular Material table
- Search functionality with RxJS (debounceTime)
- Pagination using Material paginator
- Clickable table rows to navigate to user details page
- common HTTP interceptor for:
    -Loader (spinner)
    -Error handling (Snackbar messages)
- Wildcard route handling (redirect invalid URLs to home)

# Note
The application uses a public API (JSONPlaceholder) which provides limited user data (IDs 1–10)
If a user ID outside the available range is accessed, a “Data not found” message is shown
Internet connection is required to fetch API data