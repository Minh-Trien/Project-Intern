namespace Shopping.AppCart.Model
{
    public class OrderDetailModel
    {
        public OrderDetailModel()
        {
            
        }
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal Total { get; set; }
    }
}
