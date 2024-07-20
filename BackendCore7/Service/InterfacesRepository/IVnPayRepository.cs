using BackendCore7.ViewModel;

namespace BackendCore7.Service
{
    public interface IVnPayRepository
    {
        string CreatePaymentUrl(HttpRequest context, VnPaymentRequestModel model);
        VnPaymentResponseModel PaymentExecute(IQueryCollection collections);
    }
}
