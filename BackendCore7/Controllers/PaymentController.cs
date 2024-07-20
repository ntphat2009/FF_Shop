using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PayPalCheckoutSdk.Core;
using PayPalCheckoutSdk.Orders;
using PayPalHttp;

namespace BackendCore7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly PayPalHttpClient _payPalClient;

        public PaymentController(PayPalHttpClient payPalClient)
        {
            _payPalClient = payPalClient;
        }

        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder(decimal totalPrice)
        {
            var returnUrl = "http://localhost:3000/checkout";
            var request = new OrdersCreateRequest();
            request.Prefer("return=representation");
            request.RequestBody(new OrderRequest()
            {
                CheckoutPaymentIntent = "CAPTURE",
                PurchaseUnits = new List<PurchaseUnitRequest>()
                    {
                        new PurchaseUnitRequest()
                        {
                            AmountWithBreakdown = new AmountWithBreakdown()
                            {
                                CurrencyCode = "USD",
                                Value = totalPrice.ToString("F2") // Format totalPrice as a decimal with 2 decimal places
                            }
                        }

                    },
                 ApplicationContext = new ApplicationContext
                 {
                     ReturnUrl = returnUrl // Chỉ định URL để chuyển hướng người dùng sau khi thanh toán thành công
                 }
            });

            try
            {
                var response = await _payPalClient.Execute(request);
                var result = response.Result<Order>();

                var approvalLink = result.Links.Find(link => link.Rel.Equals("approve", StringComparison.OrdinalIgnoreCase));
                if (approvalLink != null)
                {
                    return Ok(new { approvalUrl = approvalLink.Href });
                }
                else
                {
                    return BadRequest("Approval URL not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
