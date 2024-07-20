using BackendCore7.Context;
using BackendCore7.Models;
using BackendCore7.Service.InterfacesRepository;

namespace BackendCore7.Service
{
    public class OrderDetailRepository : IOrderDetailRepository
    {
        private readonly MyDbContext _context;

        public OrderDetailRepository(MyDbContext context) 
        {
            _context=context;
        }

        

        public async Task CreateOrderDetail(OrderDetail orderDetail)
        {
            _context.OrderDetails.Add(orderDetail);
            await _context.SaveChangesAsync();
        }
    }
}
