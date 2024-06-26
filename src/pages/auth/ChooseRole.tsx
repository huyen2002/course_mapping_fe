import { useNavigate } from 'react-router-dom'

const ChooseRole = () => {
  const navigate = useNavigate()

  return (
    <section className="bg-white  h-screen  overflow-y-scroll">
      <div className="flex gap-10 h-full items-center">
        <div className="flex-1 flex justify-center items-center">
          <img
            src="/compass.png"
            alt="background"
            className="object-cover"
            width={450}
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-primary_color mb-10">
            Bạn là ai?
          </h1>

          <div className="mt-10 flex gap-10">
            <button
              onClick={() => navigate('/auth/register/university')}
              className="flex flex-col gap-4 items-center shadow-lg w-56 h-48 justify-center rounded-md hover:bg-slate-50"
            >
              <div>
                <svg
                  version="1.1"
                  id="UNIVERSITY"
                  xmlns="http://www.w3.org/2000/svg"
                  width="80px"
                  height="80px"
                  viewBox="0 0 1800 1800"
                  enable-background="new 0 0 1800 1800"
                  fill="#707070"
                  stroke="#707070"
                >
                  <g
                    id="SVGRepo_bgCarrier"
                    stroke-width="0"
                  ></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <g>
                        <path
                          fill="#707070"
                          d="M1764.199,1597.184h-323.761V853.397h154.119c17.438,0,31.572-14.134,31.572-31.572V712.784h141.549 c0.04,0,0.058,0,0.089,0c17.438,0,31.571-14.134,31.571-31.571c0-11.04-5.664-20.757-14.244-26.399L918.838,8.395 c-11.205-8.355-26.562-8.355-37.767,0L13.352,655.908C2.451,664.046-2.016,678.25,2.271,691.16 c4.285,12.91,16.362,21.624,29.964,21.624h141.549v109.042c0,17.438,14.135,31.572,31.572,31.572h154.115v743.786H35.719 c-17.438,0-31.572,14.13-31.572,31.572v137.545c0,17.434,14.134,31.572,31.572,31.572h1728.48 c17.438,0,31.572-14.139,31.572-31.572v-137.545C1795.771,1611.313,1781.637,1597.184,1764.199,1597.184z M899.953,73.094 l772.627,576.547H127.333L899.953,73.094z M1302.901,1596.117V867.153h74.394v728.964H1302.901z M1239.758,1597.184H1000.3 V853.397h239.458V1597.184z M862.753,867.153h74.403v728.964h-74.403V867.153z M236.927,715.852h1326.059v74.402H236.927V715.852z M497.016,867.153v728.964h-74.402V867.153H497.016z M560.16,853.397h239.449v743.786H560.16V853.397z M1732.628,1734.729H67.29 v-74.401h1665.338V1734.729z"
                        ></path>
                      </g>
                      <g>
                        <path
                          fill="#707070"
                          d="M899.998,568.438c-83.726,0-151.843-68.116-151.843-151.845s68.117-151.845,151.843-151.845 c83.733,0,151.849,68.116,151.849,151.845S983.73,568.438,899.998,568.438z M899.998,327.893 c-48.908,0-88.699,39.791-88.699,88.701s39.791,88.701,88.699,88.701c48.915,0,88.706-39.791,88.706-88.701 S948.912,327.893,899.998,327.893z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-[#707070]">
                Cơ quan, trường học
              </h2>
            </button>

            <button
              onClick={() => navigate('/auth/register/user')}
              className="flex flex-col gap-4 items-center shadow-lg w-56 h-48 justify-center rounded-md hover:bg-slate-50"
            >
              <div>
                <svg
                  width="80px"
                  height="80px"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke-width="3"
                  stroke="#707070"
                  fill="none"
                >
                  <g
                    id="SVGRepo_bgCarrier"
                    stroke-width="0"
                  ></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <circle
                      cx="32"
                      cy="18.14"
                      r="11.14"
                    ></circle>
                    <path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z"></path>
                  </g>
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-[#707070]">Cá nhân</h2>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
export default ChooseRole
