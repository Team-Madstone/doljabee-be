import { TSignupVariables } from '../types/user';
import { base } from './base';

const VERIFY_EMAIL = '이메일 주소 확인';

export const signup = ({ callbackUrl, token }: TSignupVariables) => {
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
  회원가입 확인 링크가 도착했습니다.
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
  이메일 주소를 확인하려면 아래 버튼을 클릭하세요.
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
                          href="${callbackUrl}?token=${token}"
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
                          >${VERIFY_EMAIL}</a
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
  만약 계정을 생성하지 않았다면, 추가 조치가 필요하지 않습니다.
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
          "${VERIFY_EMAIL}" 버튼을 클릭하는 데 문제가 있는 경우 아래 URL을 복사하여 웹 브라우저에 붙여넣으세요: 
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
              href="${callbackUrl}?token=${token}"
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
              >${callbackUrl}?token=${token}</a
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
