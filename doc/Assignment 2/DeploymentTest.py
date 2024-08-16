import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By

class DeploymentTest(unittest.TestCase):
    
    @classmethod
    def setUp(self):
        self.driver = webdriver.Remote(command_executor='http://selenium:4444/wd/hub', options=webdriver.ChromeOptions())
        self.driver.implicitly_wait(15)
        

    def test_login(self):
        driver = self.driver
        driver.get("http://54.167.41.40")
        email_field = driver.find_element(By.CSS_SELECTOR, "input[type='email']")
        print(email_field.text)
        password_field = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
        print(password_field.text)
        login_button = driver.find_element(By.XPATH,"//button[text()='Login']")
        email_field.send_keys("email")
        password_field.send_keys("password")
        email_field = driver.find_element(By.CSS_SELECTOR, "input[type='email']")
        self.assertEqual(email_field.get_attribute("value"), "email")
        password_field = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
        self.assertEqual(password_field.get_attribute("value"), "password")
        
        login_button.click()
        main_div = driver.find_element(By.CLASS_NAME, "Main")
        self.assertIsNotNone(main_div, "The div with class name 'main' does not exist.")

    @classmethod
    def tearDown(self):
        self.driver.quit()
        
        