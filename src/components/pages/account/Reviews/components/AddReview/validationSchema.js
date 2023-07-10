import * as Yup from 'yup';

export const ReviewSchema = Yup.object().shape({
  policy: Yup.string().required('Please select policy type'),
  overallRate: Yup.number().min(1, 'Please rate overall rating'),
  review: Yup.string().min(10, 'Too Short!').required('Please share your reasons'),
  customerServiceRate: Yup.number().min(1, 'Please rate customer service'),
  claimsProcessRate: Yup.number().min(1, 'Please rate claim process'),
  priceRate: Yup.number().min(1, 'Please rate  rating'),
  state: Yup.string().required('Please select your state'),
  //   recommend: Yup.number().required('Please rate overall rating'),
});
