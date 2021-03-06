package com.jira.demo;

import java.sql.Date;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.jira.entity.Person;
import com.jira.entity.Project;
import com.jira.entity.Task;

public class TestAddTask {

	public static void main(String[] args) {
		
		// Create SessionFactory
		
		SessionFactory factory = new Configuration()
				.configure("hibernate.cfg.xml")
				.addAnnotatedClass(Person.class)
				.addAnnotatedClass(Project.class)
				.addAnnotatedClass(Task.class)
				.buildSessionFactory();

		
		// Create Session
		
		Session session = factory.getCurrentSession();
		
		
		try {
			
			int id = 1;
			
			// begin transaction
			session.beginTransaction();
			
			
			// Get Person object 

			Project project1 = session.get(Project.class, id);

			// Create Task object 
			Task task1 = new Task("title", "description", "attachment", new Date(new java.util.Date().getTime()), new Date(new java.util.Date().getTime()));
			
			
			// add project1 to person1 
			project1.addTask(task1);
			
							
			// save project1 in database
			session.save(task1);
			
//			System.out.println(">>> thao: Commit transaction");
			session.getTransaction().commit();
			
		} catch (Exception ex) {
			ex.printStackTrace();
		}

	}

}
