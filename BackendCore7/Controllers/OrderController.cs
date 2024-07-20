using BackendCore7.Models;
using BackendCore7.Service;
using BackendCore7.Service.InterfacesRepository;
using BackendCore7.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PayPalCheckoutSdk.Orders;
using System.Text.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BackendCore7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IVnPayRepository _vnPayservice;

        public OrderController(IOrderRepository orderRepository, IOrderDetailRepository orderDetailRepository, IVnPayRepository vnPayservice)
        {
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;
            _vnPayservice= vnPayservice;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var brandList = _orderRepository.GetAll();
                var json = JsonSerializer.Serialize(brandList);

                return Content(json, "application/json");
                //  return Ok(brandList);
            }
            catch
            {
                return Content(null, "application/json");
            }
        }
        [HttpGet("id")]
        public IActionResult GetById(int id) 
        {
            try
            {
                var cate = _orderRepository.GetById(id);
                //return Ok(cate);
                var json = JsonSerializer.Serialize(cate);

                return Content(json, "application/json");

            }
            catch
            {
                return Content(null, "application/json");
            }
        }
        [HttpGet]
        [Route("userid")]
        public IActionResult GetByUserId(string id)
        {
            try
            {
                var cate = _orderRepository.GetByUserId(id);
                //return Ok(cate);
                var json = JsonSerializer.Serialize(cate);

                return Content(json, "application/json");

            }
            catch
            {
                return Content(null, "application/json");
            }
        }
        [HttpPost("checkoutCOD")]
        public async Task<IActionResult> Checkout([FromBody] OrderViewModel orderViewModel)
        {
           
            var order = new Models.Order
            {
                Amount= orderViewModel.Amount,
                Delivery_Name = orderViewModel.DeliveryName,
                Delivery_Gender = orderViewModel.DeliveryGender,
                Delivery_Email = orderViewModel.DeliveryEmail,
                Delivery_Phone = orderViewModel.DeliveryPhone,
                Delivery_Address = orderViewModel.DeliveryAddress,
                Note = orderViewModel.Note,
                Status=orderViewModel.Status,
                UserId=orderViewModel.UserId,
                
            };

            var createdOrder = await _orderRepository.CreateOrder(order);

            foreach (var orderItemViewModel in orderViewModel.OrderItems)
            {
                var orderDetail = new OrderDetail
                {
                    OrderId = createdOrder.Id,
                    ProductId = orderItemViewModel.ProductId,
                    Price = orderItemViewModel.Price,
                    Qty = orderItemViewModel.Qty,
                    Amount = orderItemViewModel.Amount,
                };

                await _orderDetailRepository.CreateOrderDetail(orderDetail);
            }

            return Ok();
        }
        [HttpPost("checkoutVnPay")]
        public async Task<IActionResult> CheckoutVnPay([FromBody] OrderViewModel orderViewModel)
        {

            
            try
            {
                // Tạo đơn hàng và lưu vào cơ sở dữ liệu
                var orderWithVnPay = new Models.Order
                {
                    Amount= orderViewModel.Amount,
                    Delivery_Name = orderViewModel.DeliveryName,
                    Delivery_Gender = orderViewModel.DeliveryGender,
                    Delivery_Email = orderViewModel.DeliveryEmail,
                    Delivery_Phone = orderViewModel.DeliveryPhone,
                    Delivery_Address = orderViewModel.DeliveryAddress,
                    Note = orderViewModel.Note,
                    Status = orderViewModel.Status,
                    UserId = orderViewModel.UserId,
                };

                var createdOrderWithVnPay = await _orderRepository.CreateOrder(orderWithVnPay);

                foreach (var orderItemViewModel in orderViewModel.OrderItems)
                {
                    var orderDetail = new OrderDetail
                    {
                        OrderId = createdOrderWithVnPay.Id,
                        ProductId = orderItemViewModel.ProductId,
                        Price = orderItemViewModel.Price,
                        Qty = orderItemViewModel.Qty,
                        Amount = orderItemViewModel.Amount,
                    };

                    await _orderDetailRepository.CreateOrderDetail(orderDetail);
                }

                // Tạo URL thanh toán Vnpay
                var vnPayModel = new VnPaymentRequestModel
                {
                    Amount = orderViewModel.Amount,
                    CreatedDate = DateTime.Now,
                    Description = $"{orderViewModel.DeliveryName} {orderViewModel.DeliveryPhone}",
                    FullName = orderViewModel.DeliveryName,
                    OrderId = createdOrderWithVnPay.Id // Sử dụng ID của đơn hàng để liên kết với URL thanh toán
                };

                //var paymentUrl = _vnPayservice.CreatePaymentUrl(HttpContext.Request, vnPayModel);

                //// Chuyển hướng người dùng đến trang thanh toán Vnpay
                //return Redirect(paymentUrl);
                var paymentUrl = _vnPayservice.CreatePaymentUrl(HttpContext.Request, vnPayModel);
                return Ok(new { RedirectUrl = paymentUrl });
            }
            catch (Exception ex)
            {
                // Xử lý lỗi và trả về kết quả không thành công
                return StatusCode(StatusCodes.Status500InternalServerError, "Đã xảy ra lỗi khi thực hiện thanh toán.");
            }
        }
    }
}
