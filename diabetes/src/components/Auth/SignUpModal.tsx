import { Link } from "react-router-dom";

const SignUpModal = () => {
  return(
    <>
    {/* The button to open modal */}
      {/* <label htmlFor="my-modal-6" className="btn">open modal</label> */}

      {/* Put this part before </body> tag */}
      {/* <input type="checkbox" id="my-modal-6" className="modal-toggle" /> */}
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">회원가입이 완료되셨습니다.</h3>
          <p className="py-4">정보를 입력해주세요.</p>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn">
              <Link to={'/'}>
                Yay!
              </Link>
            </label>
          </div>
        </div>
      </div>
    </>
  )
};

export default SignUpModal;