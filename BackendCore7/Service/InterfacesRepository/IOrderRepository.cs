using BackendCore7.Models;
using BackendCore7.ViewModel;

namespace BackendCore7.Service.InterfacesRepository
{
    public interface IOrderRepository
    {
        Task<Order> CreateOrder(Order order);
        List<Order> GetAll();
        OrderViewModelGet GetById(int id);
        List<OrderViewModelGet> GetByUserId(string id);

    }
}
