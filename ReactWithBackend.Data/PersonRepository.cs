using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactWithBackend.Data
{
    public class PersonRepository
    {
        private readonly string _connectionString;

        public PersonRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using (var context = new PeopleDataContext(_connectionString))
            {
                return context.People.ToList();
            }
        }

        public void Add(Person person)
        {
            using (var context = new PeopleDataContext(_connectionString))
            {
                context.People.Add(person);
                context.SaveChanges();
            }
        }
    }
}
