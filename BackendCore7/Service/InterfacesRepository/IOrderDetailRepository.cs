using BackendCore7.Models;

namespace BackendCore7.Service.InterfacesRepository
{
    public interface IOrderDetailRepository
    {
        Task CreateOrderDetail(OrderDetail orderDetail);
    }
}
