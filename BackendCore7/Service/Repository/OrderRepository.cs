using BackendCore7.Context;
using BackendCore7.Models;
using BackendCore7.Service.InterfacesRepository;
using BackendCore7.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace BackendCore7.Service
{
    public class OrderRepository : IOrderRepository
    {
        private readonly MyDbContext _context;

        public OrderRepository(MyDbContext context)
        {
            _context = context;
        }
        public async Task<Order> CreateOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public List<Order> GetAll()
        {
            var order= _context.Orders.Include(p=>p.OrderDetails).Include(p=>p.User).AsQueryable();

         
            var result = order.Select(x => new Order()
            {
                Id = x.Id,
                Delivery_Name = x.Delivery_Name,
                Delivery_Email = x.Delivery_Email,
                Delivery_Address = x.Delivery_Address,
                Delivery_Phone=x.Delivery_Phone,
                Status = x.Status,
                Note=x.Note,
                User=x.User,
                UserId=x.UserId,
                Delivery_Gender = x.Delivery_Gender,
                Amount=x.Amount,
                OrderDetails=x.OrderDetails,
            });
            return result.ToList();
        }

        public OrderViewModelGet GetById(int id)
        {
            var orderItem = _context.Orders.Include(p => p.OrderDetails).AsQueryable();

            var orderfind= orderItem.FirstOrDefault(p => p.Id == id);

           
            if (orderfind != null)
            {
                var result = new OrderViewModelGet
                {
                    DeliveryEmail = orderfind.Delivery_Email,
                    DeliveryName = orderfind.Delivery_Name,
                    DeliveryAddress = orderfind.Delivery_Address,
                    DeliveryGender = orderfind.Delivery_Gender,
                    DeliveryPhone = orderfind.Delivery_Phone,
                    Amount = orderfind.Amount,
                    Note = orderfind.Note,
                    Status = orderfind.Status,
                    UserId = orderfind.UserId,
                    OrderDetails = orderfind.OrderDetails,
                };
                return result;
               
                
            }
            return null;
        }

        public List<OrderViewModelGet> GetByUserId(string id)
        {
            var orderItem = _context.Orders.Include(p => p.OrderDetails).AsQueryable();

            var orderfind = orderItem.Where(p => p.UserId==id).ToList();


            if (orderfind != null && orderfind.Any())
            {
                var result = orderfind.Select(order => new OrderViewModelGet
                {
                    DeliveryEmail = order.Delivery_Email,
                    DeliveryName = order.Delivery_Name,
                    DeliveryAddress = order.Delivery_Address,
                    DeliveryGender = order.Delivery_Gender,
                    DeliveryPhone = order.Delivery_Phone,
                    Amount = order.Amount,
                    Note = order.Note,
                    Status = order.Status,
                    UserId = order.UserId,
                    OrderDetails = order.OrderDetails,
                }).ToList();

                return result;
            }
            return null;
        }
    }
}
