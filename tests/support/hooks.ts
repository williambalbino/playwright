import { Page } from '@playwright/test';
import { ContactsPage } from "./pages/contacts/contacts-page";
import { LoginPage } from "./pages/login/login-page";
import { buildUrl } from './uiUrlBuilder';


async function beforeEach(
    page: Page,
    PageObjectParam: ContactsPage | LoginPage,
    targetPage: string,
    params?: Record<any, any>
) {
    await page.goto(buildUrl(targetPage, params));
    const pageObject = await new PageObjectParam(page);
    return pageObject;
}

export default { beforeEach }