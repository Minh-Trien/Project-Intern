using Shopping.ManagerProduct.Repository;
using Shopping.ManagerProduct.ViewModels;
using Shopping.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shopping.ManagerProduct.Service
{
    public class ShoppingSessionService

    {
       
        private readonly ShoppingSessionRepository _shoppingSessionRepository;
        public ShoppingSessionService(ShoppingSessionRepository shoppingSessionRepository) {
            
            _shoppingSessionRepository = shoppingSessionRepository;
        }
        public async System.Threading.Tasks.Task AddNew(ShoppingSession shoppingSessionModel)
        {
            await _shoppingSessionRepository.InsertAsync(shoppingSessionModel);
        }

        public async  Task<ShoppingSession> GetByUserId(int id)
        { 
            var listSession = await _shoppingSessionRepository.GetAllAsync();
            var sessionExits =  listSession.SingleOrDefault(s => s.UserId == id);
            if(sessionExits != null) {
                return sessionExits;
            }
            else
            {
                return null;
            }
            
        }
    }
}
