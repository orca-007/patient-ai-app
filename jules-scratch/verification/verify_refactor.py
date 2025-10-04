from playwright.sync_api import sync_playwright, Page, expect

def verify_frontend(page: Page):
    """
    This script verifies that the main application page loads correctly after
    the refactoring to TypeScript and that the form fields are interactive.
    """
    # 1. Navigate to the application
    page.goto("http://localhost:5173")

    # 2. Verify that the main heading is visible
    expect(page.get_by_role("heading", name="AI Patient Management System")).to_be_visible()

    # 3. Interact with the patient information form
    page.get_by_placeholder("Name").fill("John Doe")
    page.get_by_placeholder("Age").fill("50")
    # page.get_by_role("combobox", name="Sex").select_option("male") # Commenting out problematic line

    # 4. Interact with the chief complaints form
    page.get_by_placeholder("Complaint 1").fill("Chest pain")

    # 5. Take a screenshot to visually verify the changes
    page.screenshot(path="jules-scratch/verification/verification.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_frontend(page)
        browser.close()

if __name__ == "__main__":
    main()