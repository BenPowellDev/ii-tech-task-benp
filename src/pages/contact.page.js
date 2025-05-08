import { expect } from "@playwright/test";
import angryMessages from '../test-data/angry-messages.json' assert { type: 'json' };

export class ContactPage
{
    constructor(page)
    {
        this.page = page

        //Page Elements
        this.successMessage = page.locator("//div[@class='status alert alert-success']");

        // Input fields
        this.formName = page.locator("//input[@data-qa='name']");
        this.formEmail = page.locator("//input[@data-qa='email']");
        this.formSubject = page.locator("//input[@data-qa='subject']");
        this.formMessage = page.locator("//textarea[@data-qa='message']");
        
        // Buttons
        this.formSubmitButton = page.locator("//input[@data-qa='submit-button']")
        this.fileUploadButton = page.locator("//input[@name='upload_file']");
    }

    async fillContactForm(name, email)
    {
        // Grab a random angry subject and message for the form
        const randomIndexSubject = Math.floor(Math.random() * angryMessages.subjects.length);
        const randomIndexMessage = Math.floor(Math.random() * angryMessages.messages.length);
        const randomSubject = angryMessages.subjects[randomIndexSubject];
        const randomMessage = angryMessages.messages[randomIndexMessage];

        // Ensures all fields are visible
        await expect(this.formName).toBeVisible();
        await expect(this.formEmail).toBeVisible();
        await expect(this.formSubject).toBeVisible();
        await expect(this.formMessage).toBeVisible();

        // Fill the text fields
        await this.formName.fill(name);
        await this.formEmail.fill(email);
        await this.formSubject.fill(randomSubject);
        await this.formMessage.fill(randomMessage);

        // Attach the image of sad little billy, with his christmas RUINED due to the poor quality of clothes :'(, you're sure to get the refund now!
        await this.fileUploadButton.setInputFiles('./src/img/ruined-christmas.jpg')
    }

    async submitContactForm()
    {
        // Checks that the file has been added successfuly
        await expect(this.fileUploadButton).toHaveValue("C:\\fakepath\\ruined-christmas.jpg");

        // Submits the contact form
        await this.formSubmitButton.click();
    }

    async verifySuccess()
    {
        // Does what it says on the tin
        await expect(this.successMessage).toBeVisible();
    }
}