import { TResetPassword } from '../types/user';
import { base } from './base';

const RESET_PASSWORD = '비밀번호 재설정';

export const resetPassword = ({
  token,
  callbackUrl,
  email,
}: TResetPassword) => {
  const content = `<h1
  style="
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    color: #3d4852;
    font-size: 18px;
    font-weight: bold;
    margin-top: 0;
    text-align: left;
  "
>
  ${RESET_PASSWORD} 링크가 도착했습니다!
</h1>
<p
  style="
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    font-size: 16px;
    line-height: 1.5em;
    margin-top: 0;
    text-align: left;
  "
>
  계정에 대한 ${RESET_PASSWORD} 요청이 접수되었기 때문에 이 이메일이 발송되었습니다.
</p>
<table
  align="center"
  width="100%"
  cellpadding="0"
  cellspacing="0"
  role="presentation"
  style="
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    margin: 30px auto;
    padding: 0;
    text-align: center;
    width: 100%;
  "
>
  <tbody>
    <tr>
      <td
        align="center"
        style="
          box-sizing: border-box;
          font-family: -apple-system,
            BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif,
            'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
        "
      >
        <table
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="
            box-sizing: border-box;
            font-family: -apple-system,
              BlinkMacSystemFont, 'Segoe UI', Roboto,
              Helvetica, Arial, sans-serif,
              'Apple Color Emoji', 'Segoe UI Emoji',
              'Segoe UI Symbol';
          "
        >
          <tbody>
            <tr>
              <td
                align="center"
                style="
                  box-sizing: border-box;
                  font-family: -apple-system,
                    BlinkMacSystemFont, 'Segoe UI',
                    Roboto, Helvetica, Arial,
                    sans-serif, 'Apple Color Emoji',
                    'Segoe UI Emoji',
                    'Segoe UI Symbol';
                "
              >
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="
                    box-sizing: border-box;
                    font-family: -apple-system,
                      BlinkMacSystemFont, 'Segoe UI',
                      Roboto, Helvetica, Arial,
                      sans-serif, 'Apple Color Emoji',
                      'Segoe UI Emoji',
                      'Segoe UI Symbol';
                  "
                >
                  <tbody>
                    <tr>
                      <td
                        style="
                          box-sizing: border-box;
                          font-family: -apple-system,
                            BlinkMacSystemFont,
                            'Segoe UI', Roboto,
                            Helvetica, Arial,
                            sans-serif,
                            'Apple Color Emoji',
                            'Segoe UI Emoji',
                            'Segoe UI Symbol';
                        "
                      >
                        <a
                          href="${callbackUrl}?email=${email}&token=${token}"
                          rel="noopener"
                          style="
                            box-sizing: border-box;
                            font-family: -apple-system,
                              BlinkMacSystemFont,
                              'Segoe UI', Roboto,
                              Helvetica, Arial,
                              sans-serif,
                              'Apple Color Emoji',
                              'Segoe UI Emoji',
                              'Segoe UI Symbol';
                            border-radius: 4px;
                            color: #fff;
                            display: inline-block;
                            overflow: hidden;
                            text-decoration: none;
                            background-color: #6366f1;
                            border-bottom: 8px solid
                              #6366f1;
                            border-left: 18px solid
                              #6366f1;
                            border-right: 18px solid
                              #6366f1;
                            border-top: 8px solid
                              #6366f1;
                          "
                          target="_blank"
                          >${RESET_PASSWORD}</a
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<p
  style="
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    font-size: 16px;
    line-height: 1.5em;
    margin-top: 0;
    text-align: left;
  "
>
  이 ${RESET_PASSWORD} 링크는 60분 후에 만료됩니다.
</p>
<p
  style="
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    font-size: 16px;
    line-height: 1.5em;
    margin-top: 0;
    text-align: left;
  "
>
  만약 ${RESET_PASSWORD} 요청을 직접 한 것이 아니라면, 추가 조치가 필요하지 않습니다.
</p>
<p
  style="
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    font-size: 16px;
    line-height: 1.5em;
    margin-top: 0;
    text-align: left;
  "
>
  감사합니다.
</p>
<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  role="presentation"
  style="
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    border-top: 1px solid #e8e5ef;
    margin-top: 25px;
    padding-top: 25px;
  "
>
  <tbody>
    <tr>
      <td
        style="
          box-sizing: border-box;
          font-family: -apple-system,
            BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif,
            'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
        "
      >
        <p
          style="
            box-sizing: border-box;
            font-family: -apple-system,
              BlinkMacSystemFont, 'Segoe UI', Roboto,
              Helvetica, Arial, sans-serif,
              'Apple Color Emoji', 'Segoe UI Emoji',
              'Segoe UI Symbol';
            line-height: 1.5em;
            margin-top: 0;
            text-align: left;
            font-size: 14px;
          "
        >
          "${RESET_PASSWORD}" 버튼을 클릭하는 데 문제가 있는 경우 아래 URL을 복사하여 웹 브라우저에 붙여넣으세요: 
          <span
            style="
              box-sizing: border-box;
              font-family: -apple-system,
                BlinkMacSystemFont, 'Segoe UI', Roboto,
                Helvetica, Arial, sans-serif,
                'Apple Color Emoji', 'Segoe UI Emoji',
                'Segoe UI Symbol';
              word-break: break-all;
            "
            ><a
              href=""${callbackUrl}?email=${email}&token=${token}"
              style="
                box-sizing: border-box;
                font-family: -apple-system,
                  BlinkMacSystemFont, 'Segoe UI',
                  Roboto, Helvetica, Arial, sans-serif,
                  'Apple Color Emoji',
                  'Segoe UI Emoji', 'Segoe UI Symbol';
                color: #3869d4;
              "
              target="_blank"
              >"${callbackUrl}?email=${email}&token=${token}</a
            ></span
          >
        </p>
      </td>
    </tr>
  </tbody>
</table>
`;

  return base(content);
};
