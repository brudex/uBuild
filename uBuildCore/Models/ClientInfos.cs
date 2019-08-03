using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace uBuildCore.Models
{
    public class ClientInfos
    {

        public int RecordId { get; set; }
        public int ClientId { get; set; }
        public string CustomerNo { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string MaidenName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
        public string MothersMaidenName { get; set; }
        public string Gender { get; set; }
        public string MaritalStatus { get; set; }
        public string Nationality { get; set; }
        public string Occupation { get; set; }
        public string MobilePhone { get; set; }
        public string EmailAddress { get; set; }
        public string ResidentPermitNo { get; set; }
        public DateTime? PermitIssueDate { get; set; }
        public string PermitIssuePlace { get; set; }
        public DateTime? PermitExpiryDate { get; set; }
        public string SocialSecurityNo { get; set; }
        public string ResidentialAddress { get; set; }
        public string PostalAddress { get; set; }
        public string CityOfResidence { get; set; }
        public string CountryOfResidence { get; set; }
        public string ResidentialPhone { get; set; }
        public string IdCardType { get; set; }
        public string IdCardNumber { get; set; }
        public DateTime? IdIssueDate { get; set; }
        public string IdIssueCountry { get; set; }
        public DateTime? IdExpiryDate { get; set; }
        public string EmploymentStatus { get; set; }
        public string EmployerName { get; set; }
        public string EmployerStreetAddress { get; set; }
        public string EmployerCity { get; set; }
        public string EmployerCountry { get; set; }
        public string EmployerTypeOfBiz { get; set; }
        public string EmployerPhoneNo { get; set; }
        public string EmployerEmail { get; set; }
        public string CurrentEmplLength { get; set; }
        public decimal? MonthlySalary { get; set; }
        public string EmergencyContactTitle { get; set; }
        public string EmergencyContactFirstName { get; set; }
        public string EmergencycontactLastName { get; set; }
        public string EmergencyConactPhone { get; set; }
        public string EmergencyContactAddress { get; set; }
        public string EmergencyContactEmail { get; set; }
        public string EmergencyContactRship { get; set; }


        public string EmergencyContactTitle2 { get; set; }
        public string EmergencyContactFirstName2 { get; set; }
        public string EmergencycontactLastName2 { get; set; }
        public string EmergencyConactPhone2 { get; set; }
        public string EmergencyContactAddress2 { get; set; }
        public string EmergencyContactEmail2 { get; set; }
        public string EmergencyContactRship2 { get; set; }

        public int? CreatorId { get; set; }
        public string CreatorName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? AuthorizerId { get; set; }
        public string AuthorizerName { get; set; }
        public DateTime? AuthorizedDate { get; set; }
        public bool? AccountVerified { get; set; }

    }
 

}
