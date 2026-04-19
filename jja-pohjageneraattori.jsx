import { useState, useRef, useCallback } from "react";

const fontLink = (
  <link
    href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@400;500;600;700;800&family=Saira:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
);

const COLORS = {
  bg1: "#141618",
  bg2: "#1E2228",
  accent: "#D4A017",
  accentLight: "#F2C744",
  subtle: "#2A2F38",
  text: "#E0E0E0",
  textMuted: "#8A9099",
  gold: "#D4A017",
  silver: "#95A5A6",
  bronze: "#CD7F32",
};

const FONT = {
  display: "'Saira Condensed', sans-serif",
  body: "'Saira', sans-serif",
};

const LOGO_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAw2UlEQVR4nN2dd7wV1dnvv2utmdn1VHpHQRFUiiDFBmjsXQO2mGK5RmONvjExiYAmRhN7YostxsQCiSYx9oLYC10REUHp/ZR9dp+Z9dw/ZnOaiOa9ed/73rs+H/1wzp69Zq3fPPX3PLOO4r9xiEzTvPqqZsscUVMJ2z5RgAPAOnk7WbXspqQb1NWqcqOCGOIlxXcam1qqLs/36TMhH30nAKRt7pkYuk1UTJpklZph/7v2pP6rbyCCgikaNcuq1h07iMyv8z+5cW/yn+2DXxwlYW6ADprTStmuRvtJlEmjpLI+JUiYteLmxaqtoanNikmt0jq5gKoB890eV3ygavdpjEAFAYVM0TDLKtUO5f+C8V8GoEybppk0Q6vJlV0RRzbfPCpc/+i4sNh0rJbMvk6i2I1kEUwAoYWyhgJIQZErgB8qRATHQDIGTkIgCXgWXA04kItj8/EtAdXvK7f+KbffKe+q7j9cAMVoHbNxeHWaVTP+a6Ty3w6giChQWqlIRUW2VocfnfPNMLfqLMc27K+rm8EpQ05o3GDs0tWuXfKZy2cbjdrUqFWuoAjCaF2qsjoBREBrJO4KddUi/buFMqS/z14Dfb1L/0DTRYG40FxLWbq8Sar/A16P+/6iunbNROvAgFil1L9VIv+tAIpgIuAU0vTurnbtjPPDzIdT3KrsAJwcNMNHn8bDl+bHmLfM0Y1ZrapTll16huzWN6R/d0u3Gktt2pLwwHMFoyPhLPmKlrxiS7Nm7RbNyg2GT9cbNjVolEJ27xvaySNLHDS8YOJ9BSRJ0Fi1itRes5z+0+5SteNWgrRb479n/FsAFJmmmT4DNQMrmXVd+ezMi/3Sukvc1KZqpEjjWjf862sJXpzrmWIZhg8KOHBvn9G7+3TpYSEmUFagJfIl27dXVlBU0So1oAQ8wFSEKFQEWcXHaxze/MDlrQ9dtmY0IwYF4dRJeUaOKhkScYLmHhmcfrc5gx66XVX32SrT0Eyfxr/D2fwfAygyxSg1K4QYsvxb5wSZ9651zKqe4LN+lRvc/VTKvLvEUXsMCPjmxBL77+Wj6yy4AllN0yZNrqjo0cOyZp1hwacOSkFzVjG4T8j+I32sX8FQQ2OLQimoTQtWIlyJSfRfoFi1yvC3N2K8NM+jOqXkgmOawv3H+w4JjyA/YKNKj/25s8ef7oNSu7X/XwJwuzrIlr8NCdfffLsJPjoMkyO/zQT3/s2Yf75XpSbvU+Y7R5TpM8CPJCpQfLbO8Ifn4yxbbfhwpcOIwQF/vqmJ+/+U4pxfV9Grq2VLs+Lco4vceVWGckbheJBpURz/01oKJUXP+pDbL8oyoG9AWIr8u1JgYkDCYrOGZ982XPXoAEb22ChXnpoJh40UB1L44bAX3H4/vFh1O2HZ/6lK6/8ccKJkJkYpE8rH35sarLryXSPzDsMWw2dfMHLUlfXOpS+fqtbt9QOuOsenT48yfqPBzypwhMaM4r6nEny2wbCtRbNivaGwyXDcfiXm/7GBC44vEHMhGRMQEKvQCeHOvyVZtMJhc6PilQUe7y51UR4gYEwkobYMpQYHbYoMHd6TtXv9iD9mLlCH/3Jv55pbPMlsKoRuYt5hwaor3w2WfG+qUiaUmZjI+f03ACgyTSulRE2NhfLB0b+l5ZnHHbWqpmGjDi+73jGn/H4/Naf7lXhjD2fptuF8/59TQBVBKRwHpKTYe9eAJQ9t45lfNdO91rJhm2b1Bk237iGjRpbp3yOk5IMfKLDgJSwrljvc93ScXvUhe+0a4DnC/OXOFxeowDiWcuBxwpNn0ZBJ4A7ak7X7XMa0haero3/c1cx5QYWOs7rGlJ553F909G/V1FiolBKRaf8yHv/SFyLwZljZIlXhwpEzCV+/EJMN353rytFX1ptbV32P3PjzULU98PN5TKyJexYdwYsrxuDGs4RWg4BroLZK6FJn2bVXyLaMZtlah1AgzKooZFHgh0SqaeCmmUnWbNYcMbbMBccXKPqKD1Y6hDmFMW1rtFbjxLNc+84JfLBhCE4ih18sggh6xBG80eMKTrp9pLnxLlcoZUPHef3CYN7ImbJFqpSaYf9VEL/2xa3gNTTU2DXjntd8NAUb+I/8VZsTb9hdvdPrh+g9J2HLJSQoI8ogSqF1yAUvn0ljoRZtAkSi1KBYBBsThg4IKZYVS1cZTCLyrjE3smfFsoKk8Nr7Hk++EWNgL8vlU/McsJdPj1rL8nWGNRsNyo0cSmg1TqzAO6v35jfvHYMTzxFaAyrapi20oOp70TT2In782jHqe9PjJrPO903qoynB5+OeF2mo+VdB/FoXtoInUms/O2S2liUTKOP/5h7lnvvoBDaOvhTVtS+20BLtvBIBKyuI6/NpwxB+9drx6FiRsGJq4klBezBysI/nCAs/dfjsUwdTJSgliETBMyXFDY+lsBbKZbjwtiquuDtNOik0tigWrXTAA2sVSlsC3+Hil0+nJNWIsnTI5JRB/BLWWmTsKfyh4buc/NNqd/1S8Z3URxOCuYfMFpHafwXEr7xIRBTTZyAiabtg7FNaLR9FoIOrb9fuVbMPpTjhXHA8pFyMdA1QCAZLaBKkQstV/pOc9eLHlD7sgpOIMru3F3k0btYoIO4J25o13/1lDRdcXcNjr8TRGgb2DPnny3He+MCle53lG2N8MgXFmx+6+EEUQsxdVrGDFkzSUnqpK79b+AJnBq8RiodVHoZ24Z7SgGALWfSwg3gpcR4nXV3vrvyAwEkvHxXMG/uUiKQre/5Kx7JTAEVQvKqMmuFaO++gR7T++AAC5U/7rXaue/9w7LgzkCBAwrBVTTQWQRPqJMcUPuSNrXdzbctL9JYM+b93I2h2UFWWp9/xGHpaF659OEW+qBg+KODy03I88HScF+Z69O5iOXh0mbv/GaccwDcPKnH/dU28fGMT8x9u4MxDi2RyisUrHSSvcFIh/icJCrPr2NPbyIMNT/BcwwOM8NcT6hQaaSeNCpTG5lvQA0fybrfzOfXaLs6aj/Cd9LID/PcOfETNcC2vKhORIV8+dvqhzJ7oqMlvBuH8I27R8vqlYINb7lXOlS8fQjj+TGy5RJSpRtMYLKGKkZQS12ee47z8e5Qx5JSHMRYyhsQR20gev5VCs8O0B1K8NN+jb9eQmy/MstvuPgsXerz5gcv+e/uM2D1g/SbNlmbNoN4hyaRgA3CrhXfmepx7UxVawVO/aKb/QJ/G2/sQfppEEoK1ilopklMu09OH8Nv0gSABmhDbfts2RCeqsKsXMzFzN3/9RXPQpb9xgtKBt7qjn71MZh/gqMlzgn8ZQJk5xaips0J/8RknOuHsJ6A5mPWkdr77p3EUJ5yHDULAtk7hYAlUgkHBZv7YNJMJ5TVs0clKFiagQMoKp2+JmgvXRWYyJuSbNMmEgBHCosIkK+laOQp5lCtggLJCwuh2FWKBfEmxuUHTrUtIPO/QeEtfVKhadxWgcbHU2QIPJ0ZwQc2J5LSHljK2vfLZEJ2swi57m6nxB/jTL3OBW13jlILJJ8VH/fnJ7VjsCKcdqrDINM3UWVY2/X2wKs39A7ItXDRfm8v+PJjCPmciVkA6gaeTjC+v5OVt9zHaX88mncYgEXjtH5UGtGBDCHKKZEIQC7as0AbCgsJvUoTFKJwJS4owr7Bh2xyqAmIyLgzsF5BKSuvv24uEg8UCm3SKbxUW8UzDg/QMW7Aq1tEuaoMttKCHTGDmtmO49k7XEDaE2p/7B9n098FMnfWlTmXHNnDWDKVwJVz9m3uMu7Y6uy3GxXfUqnWDzoR4FRL6rZ7WVMA7qPgJTzX8kXpboEnFcTsTzoAUNLF9WlCuoASMJgKG1unQGhxTwdmAcaOYUO1AV2wIYVlhSwrTzccbmsdmTEQ2bAcbcLFs1mkmlNfwTMOD9AmbCFUM3cG5GGwxhxpxFLe8s6/651MObs26av/z39yjcIVZM3aorV8AMBJXwuCDU75tzMcHE6rguge0eU1OQPcahJTzrQ4jsnkJxpVW8ETjn3HFUlAuToenK4ivkKIieWQD8f2akaJuvfMOgREgISz4xGHexw4kojiv81CqDVwJIHXCVmJjWpCsiaxLu925hGzTSYYFW/hHwx/pFrZgldumIRCZc2vJ7nUKP360j9m41AZuetnBpYWnfFtNJZSZU0znNXQAUKZN0yyZJdK0up7cwltQOXnzTfRd749CDZuILeZaQxVdcRiDgk3MbHwUT0JKyumkGiB5g6kPqPn+elInbIXwq1NOsaA84aHn4/z+qQTKjdT8S4cCQoWKh1SfvYH0qZvBRDa0M4iNKsFwfxOPND5GXEJAt3lnpZCgjKrpypLqE7n2gbimlBVVWniLNK2uZ8kskWkdVbmjBO75kVIzsHbF9y4x8TX15WbHznikVjcNOp5W6w2VGxqStsTDTTPpbnPklftF8HIab88cNRevxd0jj2S/OjYVAceF3BbD6x+4vLbYZdt6gxNrvf1OQZSCJn5gEzUXrMN09ZGC/gKIW3WSQ8oruan5qUqc2H4egxTzqMH78qelY/ScV5R169bUl5d97xI1A8ueH3WQgNapWx3Htjn9bHnN5VC2jz0renZmIqrHQMQvtov1BKtiXJ95lvHltTSpRCe1jcCLT8hQffYGVCJE8ga+oABfHKEF4sIz73is32poaNE8PjsOMYk+29moEK/S4uD0K1Jz4TqcAUUk/0UQN+sU38+/zxn59wh0ouPDJ0qDMrscxfVP1Gt/S8kateby/Nr3+nV2KG3TvvqqViDB6hsuddKbU9lN2t7xYi8VDJ4EfrmD0whVkiOLi/l+/n226FRHh9EOvPRpm5Ag4gDRXy4+1tIKjtGAhTmLPQAcI7y2yMUWFa7TBrLdGZhGkIJBp0Kq/9f6CMROkmgQMjrOr1teoL+/Gau8dhGDBr+E6jmQ2Y0T1D9f1NZ02ZJSG6dfqkB49dWOAIqgmDQnFNmUlpalpyK+PPGy0vP9/VG13SH0AYUCBEPaZrkh8wIlZTrmmhokr/H2zpE+ZTNS0u3j7C8FzyQFJy0oBUGowFf87ooMe+4SMLR/yGPXNKNCyBejuzlVgkkK1u5ErbUgZYWOW6rP2hCpc1m1885CCUP3MMsvW15AOlkzUQoCn9KAg7j7ha462FwUr7z0VNm0KR1hFc0UPdNXJxo1eU4QzD/rZLempXd5G+FDr3UzQf/xqKAcTUbFcegUF2bmsFewmU06hbtd9FVktE3PMunTN0VB787AExAFJiW8u9Dl8VfiLF3lUChDKg7j9/QplSP6/po/pHl9oUu2qEgnhOG7Bpx6SIl9R5SRgoqczo7uo6M16dqA9BmbyNzVu33sj4OlQSeYUlzC/cVlvBrfAyMFwqgAA0EZ1a0vb64apV9//flw8oktvQtrzjk52YOHZPZEB+YEFQDnWKU8wuLa80xNQd6aD+9mRqB26wGlKGxRCFa59Ai2ckH+PZp1HKdTCKA0pKdsRqfCL6hMJ+wiNxQTbvhDiltnJQnCiFTQOpLKucuciJEG7ngiQcwVjIEwhIWfOjz2Spyzjiow7awcxoCEXwKiiSIBd3Ce5JEN5J7sikpZ2ps8AX6Se5058cG0T30FUCLkuo/nz3PeZvKRWfH81ecp5T3Eq3MsgJaZU4yagbWr7xphTGYcOcsTbyZMrstoEGmFyCCI8jgrP4++YYYS7dRXR0Fy/KAm3CGFyGHsxOFaCyYt3DEzyXUPJ6lJWbrVWlwHgiBiolu3UdG6oq/IFxWhVdSmheqk8Nsnkpz366qoyUPvRJ2NIDkTrW/3QhSHqrZ9ZVSMg8qfMam0HKvibQ6lYgvpuSuvrNrVrFvqYxKZccUVd41QM7Ayc4rRNK7UAP7Ge8ebZJNu3Ej4yoq+0GNXCMoV6YMAQyrMcEZhEdkOBhfEV5juPomDGytB8s4dhokLy5c73DgzSc8ullxJsbVZU5u27D/cZ8rkImccXqS2SqhNCd86vMj3jigyZVKRfffwMRq2Nit61FmefD3GtN+nMV8SbLcXJ6WF5JHbUKbzhQqDcG5+HiAdpBCxqFiM1WY4L73vhlLVrIOND4wHoHGldqibZ8EgfuZYqQp4d4lSn4ZDIZGCUg6Ubk3XDssvYUiwlW062Ra2KKCsiB/YhK4JoyxgJwCKgHLhoefi5IuKkoah/UPOP6nA5JFlutTayDInhON+UIej4cafZKBQ6azxFZ9v1MycHefefySoTgn3Pxtn/718jj6kSJDpSPG3Dg1SNLiDC3jDs5TmVaGSkSprLC3K4+DSSgYEm1nldEWLT0THKlQYEHbdgxcX16jvFDK4qulYMPdQN89qNZVQti6tJshOUKWQ1z6M61LNEBRt6msrOz+xuBRRHdWLivTFRrdU7N7OwTMeNG3WvDDPww9g6qQST/2miW8eXqRLlWDLCj+rCFsUYRh9J2xRlFsUQU5h/Yho/dHZWf7yi2Z6d7FYgesfTdLSqNHuzgJuAQvx/ZvBEdopET6GbjbP0aVPoH2Kp1QUhdT1Yt7GPrplVYCrsxO2bl1araYSVtR32nAvVaoPm8TOXVWvqOsTfUmpyHngUBs2sV95NfkOk0ehgjc8i64OvzJNCy2ouPDiXI9FnzqcMrnErVe0kHTAb44YF6WiWNDoSo5L28/bf2d9RblBM2Koz6PTmtm1V8jCTx0eeT6OroQ3OxwapKRxBhZxdylGYVa7sMZXmsOLy0GCTpyhhUSCNeFAteATLFWleu/zacMrUwL51aNJltmwSezyTE9I1UTuDlXh8lxG+xvoYzOU2zsPq1Ce4O2di8D7ir4dU8lPH3g2zu59Q244P4v4ijCIGJgdedEdPRKlwHXAzygG9A+587IW0gnh4ZfiFJs1xmnfOdhpSMQxentnoxaSypo1QkE5jAw20jVswiqnQ4yrFOQSA1iw3LPES3j+6tEVADWIPwYdsmKtUpulF3ge27P3qE1KM85fgyft2NztzqNHGadXqUOQuqMRWtBJ4a2FLnMWefz0W3mqu1iCUkRh7WhYu/PmPqcC4uhRPj/7Vo73PnaYPc9FJaSVJvvCUAK+wh1cQCUsWNW6Tx9Dd5tjuL8ZcFo1TVARd5buxZI1SUXZR2t/DGg0GCTIDEBs1CHg9ewgCRYFEjLC30RQ8citdwwUTr9SZSE72WnlckK4eVaSIf1CTpxYxOZUlLrtaEgEumPaft7RME5kI887qcC4PQJueyIJQWvavsOFSKAwXX1MNx/x2x68ReFJwN7Bxtboo3XxNoRULSsbqqElxCUzAAxapKxUkEkisHqLi8TqW+M/VZnUSImBYSM+nVI3wPQpbRfTLwUvCMBUCa+8E+Pvb8W46MQ8seqovrHD4Lfd0J1Y5h3ggYTgxIVfnJVlzkKX596IYdISWaEdDQsqbjE9yxXT0/4jxR7B1g4xMNslMJ5kY76aICNAJomUlWb9vATYbpSFjc0xRbyqHV0vgKbWFuhmc/jtn4oAjmC6lSvp0Y5FJAzBTQrZJs0Ft6U5bHSZbx1VJMxGFP6/YxgTdTRMHF/mjEOKXH53mmKLRrl8SWwYgWa6lSuS3UbThUrTN2wGOjkSEXA8moJqta1JQNFt7rx5Cd2y6YaUUkGKMjTmPYWbqDCabfavToqkWwsx2x1IRHrqqi/3vmEITlLIFRXH/7iG+rTwx5834xmpNDJ/nfH1GkqViuoqN12SxdFw8S1pTCoKrr8srNG1QQftiRIGTVfJoyToGFAT1SDyklJNLYD2U9Wbb0hp1+tWo7WTpGzJlR1wvE53VKRtiZiE7fPwCABXUHG7wwWKgFNrWb3BcMzltfTqYnnx1ka61lrCsopU8+tB8/WuUiA+1FRb/nJtM7MXudz8QAq3zu5giugB6qSlvUxApMIpWyYmAdsZqO1fQSl8FaMlD2iTrKntW6PjqlGhRGHBD7f3kWwX6ej/HrbikdpValBgJEqLOgEoArgw85kEky+q44QDy/zp1ibiJqqyfZnX7YCZQBCC2Ulg3nloDaWMYre9fX53cZar/5DiF3dUEeodyLEAju1gehQRQ+RiKyxTJ+SVIsSl7AOIUqqxo6/6+kv9ehc3tyhyRcVjr8SY97aHSX9Fvtr5FpW+v6/bBhqEEKsX3nvL4+cPpog5Qr6kdl4K+E+M9tPpotQJogQNjrYd6r3bo6AyumJQpW0GJVENopMXg4pn9eHcU/M8/esmWvKKI/+jlhdej+HWRtT8V21KpG3jXwW6VEIet0Z4enaMk35ew+cbDLdfkuW6S1pwv8zeBjoSuXbAKIniQb+zblcuMAQVZlyJSFK0X97SbG2Qx1Uk3QDCADoZz6zyKCvTcUodBdJS0jvOIBQEjZrRe/m8fHsTE4b5HH9VDQ89kcCpltZXF3Y4LCgnej8EAe3Jl14rNsLASQv3zUpw2owaalPC365r5ozjCgQZtQNtiap1Nq/prKkaIadcSsrZAYCCIyWqEoAN881NW5p1VY8rc4KTw1PUJsqCX4yCr1bTZmnSiQqF1e5uCqSskJYK+7KDDRoDQVbRoy7kr9c1c/7xBc6+oYrrfp+KWjj0F2sbIqATQsM2Q3Ne8/ZHLm+8FcOp+mKOay1oB4wnXHN3mvNvrmLCMJ+nf9PEfvuU8ZsrgfqXmADbvD3n265rEUu9TSeRSirXui0VxYIJlZeaKsC6uUz3K3Oa3qMLiN6Cp+hRUxJKLe0ciQIRGnWcrTqJK7bdhAKBItzmVqptO16lqTgOI3Dz5S3cfkmWax5KccGvqhEdbX57wCsCGNjWpPnOddWs26KxFr53fTWLP3LR8TYQwzBitAshnHd9NdMfSnHWkUX+el0zA3qFBC2qLYv5wogeeLjF3b6Zym8VRixrTA3tU7lWAIOAat0iXWsVCFvGjB5d0Ep5Ik51Hg39uvpQbGxNY6Iw2hKqOJ+ZOlxCOnd7BetiX7bK1qF1pGpBVnHB6Xme/GUzM1+NceKPa8jkNU4yAtFWpG/uhy5vfuhQlbDEvaiRcuEnDqoSYYUhOClhc6Nmyk9rePC5OL86N8s9P8mQjlWalHYWpFdYmXCT14HWij4SljldKkxUO8CVhlKB7olmvGoFqjaP8kRDiDJVq9CaXXuFxEubOtibiI0xLHZ74LSXQFHgCMHq2Fey0KFto6X8JsWRk0q8+ttGPlnrcMgldazZaHCqhKBSiDIOJGKRxy75CitRIxE2qto51cLHKx2OvLyWt5e4/OlnGa48Jxc1IkUFxC8fEtnXcJtDuMVDtQNQI5SV4QOnJ7TfK0SNOrlmdqnLQLUhkPQqovKTBe3MxRoG97XShfVR8qraeWKxvO/2xVfmC4F0uMkj3OhFbWjbnXTln9vLjk61YOLRLx0TcX977R7w2h2NVCUtB15Qx8IlLvGaiEWxIRRKiiCEIf1CetZb8iWFBeK1ltff8zjsh7W0FDRP/6aJqUdFTLSyEWFrEjtpBREFruCvSCI53frWUxS6WjbrFIvdHnRI5UQiALMbGdYnJ8RcQuvOpbVJzhs4j7xH357oXVMbIdcSfQGpsDE+c93erNdVeAQdPXFRU16SqqhCdEPtCVpFG9FVwl2PJHnmtRgqKSgdcXlBVtG9LuS5m5uYONLn4EtqeWZODF1rKfrwk9PzDO5j2aVXyCM/y9ClxqJTwmPPxDn6ylp27RXy4i2NjB/p4zdHmY2OC+s3a96a76GTkUSHYeVBbl9zxXaXP0hV2NBozRZFQnwWOb3YYmrQ7VK5yJwpYvnVjBxc0pRilN3+8yoQgNt3xmI/G2vw6rUe1Web0LQh6iuTqMCiCdlmannH60fK+m3NiQK4QmlhGps1WCWouDDtvjSLVzp8us5w1EW1zJoTo1sXS1BWbNqmI3bGiZyLq+Ch6c1ceFKBb15dwwN/THHcxBL/8Z0coYWGjGbk6DJHTypxy11pzvxlNSceUOKfv2liQO82ZyEKCr5iwScui1c4NOc0blpwaqIivK74ReVFZidYmUDF2mg4QeFKyAuxwR0pfYjsX7lEbz6X0UPQZGMN5eoZiwG0zMSorkMzotNvS0Jz4J556zQtB93GvOiKEX0yNrSjaxdQniXc4FFelIZ4lHdaC9++rprvXlPDIWN8Xrm9kX1Hl3FSlnufTrBigwE36kSQMGqqvObCLLddnOUHt1TxiwfTUKltxCvvwF3ymyquuDvFVWfkeejqZtIxCAqRs7AWdExYvsLhk/WajQ2ag86r46xrq7n/LwkWfOSSyVUCcyMU3qrt0Lm1XX236hT/jO8OlYJS66eOA01b2LvLGtt1V4O1qbe77j40IzMxDo2jNcwLlVP9lAq9o/fbuyD9n1zKyuIRqEqmF5nKMs/Fd2eF04VeNkOZCuVdsSmFObV4I7KIK1x9Zo6RgwImjvTpOsyHzZq58zyefC3G4D4hM2fHOdkWGTY4wJZUpFUZxblT8/TuEnL6NTVsadJoDS15xbnTq3nohTi/v6KFs08uYHMq6sqv1IKNA5QVwwYGDN/LZ+YzcZ58I8bR48r8+PdpkjHhuP1KzLiwhfKnCUoL0h1IYIumRgo8ER/G504PtJRaAVQiYFzU1k84dHyjSDpOMVf3FITQOFo71O1qYR5un3Pfset/YXv3K5gD+n7Oyq1roPcuUC4hSuEQ0GJqeDS+N1dnZ7NFu1FnwnYpXO9RnFNL8phtuIHh5KMLbFzrcOddaWYv8FBE3QbH71/mp+dmqdFRBQ4qhSQVeeijDy7xQk0jp0yviRqOFASB4u/XNXPk5BJBxd6pShBuaizPz47TmFWcelyBwlbD1GOKvPORywPPxjls3zK/+n424g0CReG5evAVJKQDi25R3JsYTcTAtCdOFOL79Cx8wOFjS0blulnpedY78CbU7Wq1mjorlGlo3f/8RUFY/S7VmhPHt4Tepvmg2xhoi0JJmXuTY9ioq/AI21TZKlTCUphdi78iThgLCfOax1+O8cJcjyWfGb51aJG9dwm45KQ8XestzTmNdgVt2rKR7R563D4+z97YRF2VkIoLT93QxJGTSvhNqrUyF4ZASnjwiSQr1hvKFrZuMCTqLVJUXPXtHItWuBw6ukx1nSVRF1J8rQZ/abKD9IUoqqXE694AZsd3R0ux0huzXX092LqW/Xp+Eu42wsXma95NDzp/kUxDq6mzorImkyZqkTIm1f8ewoQ6ZJwwIjYfyTRW9CPyxlp81rvduSc5hlpbJGjfv1GpNWQf744qGrQIl5xU4G+3N3LnpS2c9esqRg0OGDjMZ8Mqw/4X1XFlhWoysTaDbXRUKBq6e8CjP88w8+oMY0ZEntYxkcpaG5klAxwxtsyY3QKufTDFMT+q5c7HkpRL0HVIwE3nt7BgmQsxS2l5gvzTXVDxzvWbSOKuTx2IpVMlrmIfvA3vc8YBDVCVUgWn3z1IGSZN1JF/ALa3a5nh9/3Vb0yvr+qDPm3seqtWzwM3Fk1UkUJtS9ye3p9lTldS7Y2tgIpZwvUxso/0AAOhgG3W7N4vZJeeIWcfV4AAzr+1iu8eXmDVZs3vHk+wsVlH1wpot1KybFbsuWvA8CE+5UbdKnnaiTq6yj4s+tClV7eQsfuUGTYw5LxjCzz7tseIs+q59/4Ux+5f5idntxCu88g/0iNijto98wBNvc3zRHwYL8eHYjpLn3GRpq2M8ubaIw8WzZbU+lS/+/66vR2wFUClEF6daJTqkVXpYY+hPXXG4YEdUn4NaY0JI1evCGgy1VxV9Q2SHbxVRZWTlvLiFLnHu6NjFm2EQkFx2TcL9Ns94L5HU7y9xOX9ZS7NLZouNcJFv66mWFKYuLC1IQqg3WqBePTgvFqLdqBYUmxrUTz3RoyTp9Xwg9uruOb+NKSEo8aV+fPLcVIJ4bJT8mzabAgRYoEmc28v7DYX5bUL9lF4hGzVKa6qOgxFp8xDBNwY5rO3OPvAdTbRP6GKzrDHVI8e2Qir6PK25zFpkhVBOQOm3xpkuue67yr67P0+F7XiLfAqdRIij2xsgScTo3gguU9UbGrfu2tBpSzFt6rJPdYDERg0MOD04wt8ONfj4RfjfP+4Ao4Rbri8hcP2LdOQVaSrLa/P9fju9dX87Y0Y37yyhrOm1fDCOzF++6ck2bwiW4Jzb6jm8/WGQlnxg+MLPP+eB1nFiQeUWLbG4fvHFjjvjAI/uzRDVahpurMP4boYKhF2UN0QRa0t8uPqQ/nc7Vl5+aYtdFGOizRuYrTzmpx2XKhtQ9ec9Jx+q4Bi0qTWmVoBVGqGZdYUrbqMXYPX7ya0p885wdpR8hLStDnq/G51KKDF54rqo1ng9qJGOtlDCyodgdjyQC/CvMYGQpe0cN/PmwktjBsaMHyfMrmioiYlfLbG4YLbqph+To61WwyOhhMOK9Kl2nLzX5KcMr2GuhqhUFYcPKpM326Wax5OceNFLdhA0b1nyHETSngaLJb8hwkafteHcG2sQwEd2gro9yZH81ByPMbm26kurRU4b/mL/PCoDTY9IKaDcOBNyb5j1zBzim5/WEXH6sSSYSLT0M6gB28Lcv0aavuE+qrjN9jYx0+jnbauHanUrzI6wZm1U2lWcRISEHYssKLSIeUPU2R+15dwZZxeA8vsNjDk0H189tvTxzZoYo5QLCvO+EU15x9bYMyBJbY0KZatcfjrSzF61AqTR/pki4pLbq2ia7Vl5QbDRScU6FlnmbCXDwHYguJX57Ww76gS5VdrKPy+T6S2nSTPR9NF8szxBnJpzXEVyWuvuhYVSyBrPuLo7q/bk4+zOmjo11AYcv9tMg3NkmEdOYb2P6gZMyx7TlGqtn+DSo28DJtWJx8l9pRd3sCumI+Kp6LUgSj4NFJiqdeHU+tOQQBPwk4gKlQyJNzskrmrD/nn6rF5mDi+xIS9fHRRkUoIi1c6jBvqc8HpeWyDZmtGc+GJeX7+3Rx13UM8V7jsm3kG9gh59JU4i1c6jN6/RE3K8pcXo4YicYRqT1F6vAfZP/eAEFRMOkleVKL9yHTj1LrTKCgXsO0ougppUCrQZ+0T/OKsjHWqU8p6oy6tre3fwJ5TVOcTkHZI/MhMjJrqhcH7Y1828QUHr/1Eh4f+tI/5eI/LUclaJGh71Wv7e3JHFD7kscbHUUBBOR1fe6iQi5I3eCNbSE7djI5ZVOXt9fc/dhk5OMBxBRMTTrqyFj+Ag/ctc9lpea67P8W6rYY7ftXE2T+spbZKuPGKFho3aBwN1fUhwZo4mYd7EG6IodNhZG3ayYqPoV7yLDNdOabLd1ht6isZR3vVteh4Cv3eo9x+2DPh+ReJKW8b8XJs/LvfkJmB6Xhg2s4AlGkaNUPY9PdB4aofzTPeqtSzz7r6lHvHqNz487Fhxw7y7SBOLn7MnxtnUitFmlWsrQF9+zCCbXbwhueoPmt9W2NPXKCksBaUgXkfOyz41CWbV1x6cp6lqx0+XW84ZlIR7SuKJUXMjZgdjBA2ODT/ti+22UElOxb6hShc6W5zvOP1ZWrdGawztRgpdbR729/Y/PhNvlPzgDzwy6wN1YBc2O+20fHuR6yAaWpHB/V8KfW4o9ddb7zLOD9+7Uhk7GmV177aFrAdxD3La3m4aSYj/I1sqbzo3IHZqFBgNT9YizuogC1GMeD2OA8qqudFpTTJ6Ij0dEFyURy3/W1NGypUKqT4Uh35J7uhqoMO4IVE3bX1tsBj8b05r/YkWnQMI+VOTiNExVLIhuXsv/V3/OP6rUF9/1qnlJ98UnzMf+J1VwA1dVYosyc67vDHnrSyz63gOFecLcEFQ17ALnoWnUjTnrUM0BibZ4nbm8ldzuUPyX3oYvPEJSBoD6EAShA/urXW4Hrt9gKUc4pSo8FvjL4XVLpWbYXpCcOI5TY64h7xdYfClkURoKmRIkYsV1Qfyen1p9OiXfSOwPOSSON6hqx+gPuu2BbUD3Sdcm7krfExjz0psyc6XwYefEXJOnrlH6Mmu0Hw/vh/mPjCY/1G/LOuibl/ajgNvfc3sIUs7V/U1ViscgCXUwrzmdHyErsF22jWccrKYAJBVwXUXLoWUxWSzWhKgaJLlxBbqrR8JCMwbL7SxWAi0DvUVT3wGzVbitCtKUbznb0RD6wokuKTFJ9XY7twZdURzIvtgrb5ills3zBUAS+zmf4f3sHjV6z0xx9m3PK2EU/Fxr1znMz2HSYR7uwMwq+s+UeHTijFdEna+WOf1e7SAwoNKjjnmpjzSMMU9IjDscU823tHokmjZVqdoEvYzGXZNzkrP5eetNCcT+Kd3EDikEbyzYbv31jFW0tczj++wBXfzhHkFa8t8kh4woThPqWCoqWgKJSICAhHyOYV9z2d4LWFLl1rhFfuaKD8WA94N0EyWWSJ7smt6f15MDEaUfqL9g4imxdPYRvWMeDje/jjxZ8FBx2FEzQOfcPZ970jma7yTBf5quPydnD0TyeEoxN9lFIqKyLHhvP2eSVR98moB6aV/PSvH3fvez+L3ucEJAyQMOps3H68g7F5tqkEP6s5mvvTo/netgV8a893GXBgAzbvEHOEn5+Z45AraiN2xRG+86saXprnEYZwxal5MjnNfU/HqasSMnnFyMEBk0eWeebtGHddnmGfwQHKKhJHb+b9z/fhITuWP6eH06LTKFtES9AJPAGRyGGsXcoeax7kD1es9ccdrFy/abcF7r7vHRvtNTqh6avw+ao2nwqI0TkqSqkms+vLk0N/z7djXXDv+anv/3zMP4i9fS/iF1FekrZ3vCIjrghxbJbPVFeu7nEo+ZPyUam00vrmh4qyrzh1colFCz2efifGe3c2Mmt6M7f9Jcl+e/o8fk0zM6c3063GcviYMoN6h+zSKyQRF1ZvNrhKY+oLfHxCnLtj3yCrDaaish17/CxKmUjyPprDQQ138I/pa/1xhxq33DzsbXfQy5OVUk3bz8n5Oth8LQA7gFhf32wGvHu49YfNIu240y8JwvtOe1MGLLwZWb8MnaiKmOyKg5FKGwVFl99OeJg9eywnKMciGXXgn297dK+1DBgQYAWMEj5abfh8o0PMFQ7Yu8zkQ4qEIWxu0pxxWBEr8MZil4turuLw/6jlhkcSIEm+O/Rlpg55ASmkOpVZJYrxYkkkLOO8+zDndHtI/nHDtnC3MZ7rNw2d5e3y7uGqvr75XwHvXwKwA4jdVIsZtXCqVQf+Dkmb078ZqKevXhEcXbwN5j2BhAE6lgIEowKCYoqDdl3ED0Y/T1CoQmsbtVz4MHuBx0HDfTAwfPeAC04scMGtVVx4e5pzjy5SW2+RJs0ts5JMGObTrX/AoF4hN3w/y7w/NXDzD7Lc/VScpgYNyuXWSY/StXorElRaUcSijIuOJbGrFjNw0U3ccczz4b0z8qqmZ7UJ8gf+zhuzcKrqplr+VfD+ZQDbQBQlM0vG7P30RaSPOiUo92/ec7Q4T1zfEt488UnZZfFN2E/fRxkHnCoSsTx3T3wIkUrwLVH4sX6dYdFKh8P2LQNgfbj28hYOH1NmSP+Ay06NTjzeuMEwe6HH+ccVkHJ0MOPJB5ZIxoWqRNTgqZRFAo9eNZu45YBHsKUY2nHQ8RTStJn4ew9yuneHPHf1J+E554mxun9zyJGnuCOfvmjmzJIRkR0Gyl81vtKJ7BhEJUAoEhqlHpwpW/62KFz7m1u9qo+PuOS8PEcf+Elw6+OrzBPzh6kN1cdx/XffZugeK2BrDSKWwEYnuC1b41BfZRk/1Ieiwk0Kzz8f57HZcZ68pplkOuogvffpBN1rLZNGlyGERZ85nHx1Db3rLRsaNP9xap7qOks5q3Bsmm+Nf5VXt47k/lf2Ir7xScYl3pFLz9wSnnC4dUilTDk77AWvxw8vVn3bH8D4tVtmO2Lxn/pWu9G2AA/5+PRzguy8a53Eqp4UfRbMJ7jzqbTZ2uyqQ8YGnHRgid59wyimKyr8oqKhRVNfFT14Jy3c+FCKNZsNt/8oQ5hVKA+Ov7KGQ/Ypc+l385QbFV5C+OATl1cWuIwYFDJpbCmKFR3Bb9bMXmx46Lk6Pt/syA8OXRtOOUwct7dHmO2/MYyP+3ls2P+QI0DbQOx4CK397DsX2/LqS5zqLdUUSsyb74WPvZJgyeeO6dMt5OBRPvvvVaZ/7xDSAj7RsQDbWxODtvfklIZ8IaqHJOJReoeR6HvJ6EFk1xnmL3d4eb7HguUu6ZiEJx6YY8rBBUPPBDR3y5RV/9tK3R+6vbrP/7BDaNuPjscgv7ZrsPr688l9OMWpaxkAeTKrNC/PT4SvLIixapPRiZioQb0D9hwYslufgD5dLXVVEjUSOdJmoSP6kaCkyOQ1mxo1n67XfPS5w8drHLY2aalKWDt2aJkjxxbMkOEhxBOwrWZVOT5slu3x47sSPQ9aCf9Dj0FuP3Z0EHf5o3O+SW7VWZ5q2J/apqjyvwEWrnDtguWuXbraZVODVrlilMq4DspzwdHbz1GIXsL2w+igOM9B6qqtDOoVMHyQr/cd4uv6gRbiLmRqCcL6NwNvwAO53vf9pev/Swdxtx87Ogq+tPbmUXbT4+N00HCspzL7kip0I1kCG0BeIKdpaVI0ZjWZHJT8CrvuQFUCatJC1xqBdAhpFZXvijHIJbb4YfX7oap/Svc65d1Y3/+Hj4LvPL7sjxE0Nc2v89bdurcuLN8HWxhlbH6AY5vSGOmKLu/wjxFgnTzWbLWqNhuq5CqrUwtsYtD8cp9LP6j9/+2PEexofK0/h7Hu7SQbfp9MKadWqbyiBEUvKYEETRt6/a/8mP9hfw7jfwN3zVOow2zGEQAAAABJRU5ErkJggg==";

// ─── FULLSCREEN PREVIEW ───
// Shows the card at exact Instagram pixel size for screenshot
function FullscreenOverlay({ children, onClose, targetW, targetH }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#000", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ marginBottom: 12, display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ color: COLORS.textMuted, fontSize: 12, fontFamily: FONT.body }}>
          {targetW}×{targetH}px — ota kuvakaappaus tästä
        </span>
        <button onClick={onClose} style={{
          background: COLORS.accent, color: "#111", border: "none", borderRadius: 6,
          padding: "8px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: FONT.body,
        }}>✕ Sulje</button>
      </div>
      <div style={{ width: targetW, height: targetH, overflow: "hidden", flexShrink: 0 }}>
        {children}
      </div>
    </div>
  );
}

function useFullscreen() {
  const [show, setShow] = useState(false);
  return { show, open: () => setShow(true), close: () => setShow(false) };
}

function PreviewButton({ onClick, label = "Täyskoko 1080×1080" }) {
  return (
    <button onClick={onClick} style={{
      background: COLORS.accent, color: "#111", border: "none", borderRadius: 6,
      padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer",
      fontFamily: FONT.body, marginTop: 12, width: "100%",
    }}>
      🔍 {label}
    </button>
  );
}

// ─── SHARED COMPONENTS ───
function TopBar() {
  return <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentLight})` }} />;
}

function SideAccent({ top = 55, height = 280 }) {
  return <div style={{ position: "absolute", top, left: 30, width: 2, height, background: `linear-gradient(180deg, ${COLORS.accent}44, transparent)` }} />;
}

function Footer() {
  return (
    <div style={{ borderTop: `1px solid ${COLORS.accent}33`, paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
      <img src={LOGO_SRC} alt="JJA" style={{ width: 22, height: 22, borderRadius: "50%" }} />
      <span style={{ color: COLORS.accent, fontSize: 10, letterSpacing: 1, fontFamily: FONT.body }}>#jja1975</span>
    </div>
  );
}

function StoryFooter() {
  return (
    <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
      <img src={LOGO_SRC} alt="JJA" style={{ width: 18, height: 18, borderRadius: "50%" }} />
      <span style={{ color: COLORS.accent, fontSize: 9, letterSpacing: 1 }}>#jja1975</span>
    </div>
  );
}

function Badge({ icon, label }) {
  return (
    <div style={{ display: "inline-flex", background: `${COLORS.accent}22`, border: `1px solid ${COLORS.accent}44`, borderRadius: 3, padding: "4px 10px", marginBottom: 18, alignSelf: "flex-start" }}>
      <span style={{ color: COLORS.accent, fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", fontFamily: FONT.body }}>
        {icon} {label}
      </span>
    </div>
  );
}

function Field({ label, value, onChange, multiline = false }) {
  const shared = {
    background: "#0D0D0D", border: "1px solid #333", borderRadius: 4,
    color: COLORS.text, fontFamily: FONT.body, fontSize: 13,
    padding: "6px 10px", width: "100%", boxSizing: "border-box", outline: "none",
  };
  return (
    <div style={{ marginBottom: 8 }}>
      <label style={{ color: COLORS.textMuted, fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 3 }}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} style={{ ...shared, resize: "vertical" }} />
        : <input value={value} onChange={(e) => onChange(e.target.value)} style={shared} />
      }
    </div>
  );
}

// ─── Reusable card renderers (used in both preview and fullscreen) ───
function KilpailuilmoitusCard({ title, subtitle, date, time, place, price, badgeText, size = 540 }) {
  const s = size / 540;
  return (
    <div style={{ width: size, height: size, position: "relative", overflow: "hidden", fontFamily: FONT.body, background: `linear-gradient(145deg, ${COLORS.bg1} 0%, ${COLORS.bg2} 100%)` }}>
      <TopBar /><SideAccent top={55 * s} height={280 * s} />
      <div style={{ position: "relative", padding: `${30*s}px ${40*s}px ${24*s}px ${46*s}px`, height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
        <Badge icon="🏹" label={badgeText} />
        <h1 style={{ fontFamily: FONT.display, fontSize: 48*s, fontWeight: 700, color: COLORS.accent, lineHeight: 1.05, margin: `0 0 ${6*s}px 0`, textTransform: "uppercase", letterSpacing: 2*s }}>{title}</h1>
        <p style={{ color: COLORS.textMuted, fontSize: 13*s, margin: `0 0 ${28*s}px 0`, fontWeight: 300 }}>{subtitle}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16*s, flex: 1 }}>
          {[ { icon: "📅", label: "Päivämäärä", value: date }, { icon: "🕐", label: "Aika", value: time }, { icon: "📍", label: "Paikka", value: place }, { icon: "💰", label: "Osallistuminen", value: price } ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14*s }}>
              <span style={{ fontSize: 20*s }}>{item.icon}</span>
              <div>
                <div style={{ color: COLORS.accent, fontSize: 9*s, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>{item.label}</div>
                <div style={{ color: COLORS.text, fontSize: 18*s, fontWeight: 600 }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

function KisatuloksetCard({ title, info, results, size = 540 }) {
  const s = size / 540;
  return (
    <div style={{ width: size, height: size, position: "relative", overflow: "hidden", fontFamily: FONT.body, background: COLORS.bg1 }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 80% 20%, ${COLORS.subtle} 0%, transparent 60%)` }} />
      <TopBar /><SideAccent top={55*s} height={280*s} />
      <div style={{ position: "relative", padding: `${30*s}px ${40*s}px ${24*s}px ${46*s}px`, height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
        <div style={{ color: COLORS.accent, fontSize: 10*s, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8*s }}>🏆 Tulokset</div>
        <h1 style={{ fontFamily: FONT.display, fontSize: 36*s, fontWeight: 700, color: COLORS.accent, margin: 0, textTransform: "uppercase", lineHeight: 1.1, letterSpacing: 2 }}>{title}</h1>
        <p style={{ color: COLORS.textMuted, fontSize: 13*s, margin: `${6*s}px 0 0 0`, fontWeight: 300 }}>{info}</p>
        <div style={{ height: 1, background: `linear-gradient(90deg, ${COLORS.accent}66, transparent)`, margin: `${20*s}px 0` }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 12*s, flex: 1 }}>
          {results.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14*s, background: `${COLORS.subtle}88`, borderRadius: 8*s, padding: `${14*s}px ${18*s}px`, borderLeft: `3px solid ${r.color}` }}>
              <span style={{ fontSize: 28*s }}>{r.place}</span>
              <div style={{ flex: 1 }}><div style={{ color: COLORS.text, fontSize: 16*s, fontWeight: 600 }}>{r.name}</div><div style={{ color: COLORS.textMuted, fontSize: 11*s, marginTop: 2 }}>{r.series}</div></div>
              <div style={{ color: r.color, fontSize: 20*s, fontWeight: 700, fontFamily: FONT.display }}>{r.score}</div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

function TiedoteCard({ title, body, noteTitle, noteBody, badgeText, size = 540 }) {
  const s = size / 540;
  return (
    <div style={{ width: size, height: size, position: "relative", overflow: "hidden", fontFamily: FONT.body, background: `linear-gradient(160deg, ${COLORS.bg1} 0%, ${COLORS.bg2} 50%, ${COLORS.bg1} 100%)` }}>
      <div style={{ position: "absolute", top: -60*s, right: -60*s, width: 200*s, height: 200*s, borderRadius: "50%", border: `1px solid ${COLORS.accent}15` }} />
      <TopBar /><SideAccent top={55*s} height={280*s} />
      <div style={{ position: "relative", padding: `${30*s}px ${40*s}px ${24*s}px ${46*s}px`, height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
        <Badge icon="📢" label={badgeText} />
        <h1 style={{ fontFamily: FONT.display, fontSize: 44*s, fontWeight: 700, color: COLORS.accent, lineHeight: 1.1, margin: `0 0 ${20*s}px 0`, textTransform: "uppercase", letterSpacing: 2 }}>{title}</h1>
        <p style={{ color: COLORS.text, fontSize: 15*s, lineHeight: 1.6, margin: `0 0 ${24*s}px 0`, maxWidth: 400*s, opacity: 0.85 }}>{body}</p>
        <div style={{ background: `${COLORS.accent}15`, border: `1px solid ${COLORS.accent}33`, borderRadius: 8*s, padding: `${18*s}px ${22*s}px`, marginBottom: "auto" }}>
          <div style={{ color: COLORS.accent, fontSize: 10*s, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6*s }}>{noteTitle}</div>
          <p style={{ color: COLORS.text, fontSize: 13*s, lineHeight: 1.5, margin: 0, opacity: 0.8 }}>{noteBody}</p>
        </div>
        <Footer />
      </div>
    </div>
  );
}

function TekniikkaCard({ term, eng, explanation, tip, size = 540 }) {
  const s = size / 540;
  return (
    <div style={{ width: size, height: size, position: "relative", overflow: "hidden", fontFamily: FONT.body, background: COLORS.bg1 }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${COLORS.subtle}18 1px, transparent 1px), linear-gradient(90deg, ${COLORS.subtle}18 1px, transparent 1px)`, backgroundSize: `${40*s}px ${40*s}px` }} />
      <TopBar /><SideAccent top={55*s} height={280*s} />
      <div style={{ position: "relative", padding: `${30*s}px ${40*s}px ${24*s}px ${46*s}px`, height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
        <Badge icon="🎯" label="Lajisanasto" />
        <h1 style={{ fontFamily: FONT.display, fontSize: 52*s, fontWeight: 700, color: COLORS.accent, lineHeight: 1, margin: `0 0 ${4*s}px 0`, textTransform: "uppercase", letterSpacing: 2 }}>{term}</h1>
        <p style={{ color: COLORS.textMuted, fontSize: 13*s, fontStyle: "italic", margin: `0 0 ${24*s}px 0` }}>{eng}</p>
        <p style={{ color: COLORS.text, fontSize: 15*s, lineHeight: 1.7, margin: `0 0 ${20*s}px 0`, opacity: 0.85 }}>{explanation}</p>
        <div style={{ background: `${COLORS.subtle}55`, borderLeft: `3px solid ${COLORS.accent}`, borderRadius: `0 ${6*s}px ${6*s}px 0`, padding: `${14*s}px ${18*s}px`, flex: 1 }}>
          <p style={{ color: COLORS.textMuted, fontSize: 13*s, lineHeight: 1.6, margin: 0 }}>💡 Vinkki: {tip}</p>
        </div>
        <Footer />
      </div>
    </div>
  );
}

function StoryCard({ title1, title2, dateText, placeText, showSwipe, w = 304, h = 540 }) {
  const sw = w / 304;
  const sh = h / 540;
  return (
    <div style={{ width: w, height: h, position: "relative", overflow: "hidden", fontFamily: FONT.body, background: `linear-gradient(180deg, ${COLORS.bg1} 0%, ${COLORS.bg2} 100%)` }}>
      <TopBar />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: 200*sh, opacity: 0.03, color: COLORS.accent }}>🏹</div>
      <div style={{ position: "relative", padding: `${50*sh}px ${28*sw}px ${30*sh}px`, height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ background: `${COLORS.accent}22`, border: `1px solid ${COLORS.accent}44`, borderRadius: 4, padding: `${6*sh}px ${14*sw}px`, marginBottom: 40*sh }}>
          <span style={{ color: COLORS.accent, fontSize: 10*sh, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>⏰ Muistutus</span>
        </div>
        <h1 style={{ fontFamily: FONT.display, fontSize: 40*sh, fontWeight: 700, color: COLORS.accent, lineHeight: 1.1, margin: 0, textTransform: "uppercase", letterSpacing: 2 }}>{title1}<br />{title2}</h1>
        <div style={{ width: 40*sw, height: 2, background: COLORS.accent, margin: `${16*sh}px 0 ${20*sh}px` }} />
        <p style={{ color: COLORS.text, fontSize: 20*sh, lineHeight: 1.4, margin: `0 0 ${8*sh}px 0`, fontWeight: 600 }}>{dateText}</p>
        <p style={{ color: COLORS.textMuted, fontSize: 14*sh, margin: "0 0 auto 0" }}>{placeText}</p>
        {showSwipe && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6*sh }}>
            <span style={{ color: COLORS.accent, fontSize: 22*sh }}>⌃</span>
            <span style={{ color: COLORS.accent, fontSize: 10*sh, fontWeight: 600, letterSpacing: 1 }}>LUE LISÄÄ</span>
          </div>
        )}
        <StoryFooter />
      </div>
    </div>
  );
}

function KaruselliCard({ slideNum, badgeText, title, desc, tagList, size = 540 }) {
  const s = size / 540;
  return (
    <div style={{ width: size, height: size, position: "relative", overflow: "hidden", fontFamily: FONT.body, background: `linear-gradient(135deg, ${COLORS.bg2} 0%, ${COLORS.bg1} 100%)` }}>
      <div style={{ position: "absolute", top: -20*s, right: 30*s, fontFamily: FONT.display, fontSize: 220*s, fontWeight: 700, color: COLORS.accent, opacity: 0.05, lineHeight: 1 }}>{slideNum}</div>
      <TopBar /><SideAccent top={55*s} height={280*s} />
      <div style={{ position: "relative", padding: `${30*s}px ${40*s}px ${24*s}px ${46*s}px`, height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 6*s, marginBottom: 24*s }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: parseInt(slideNum) - 1 === i ? 24*s : 8*s, height: 4*s, borderRadius: 2, background: parseInt(slideNum) - 1 === i ? COLORS.accent : `${COLORS.accent}33` }} />
          ))}
        </div>
        <Badge icon="🏹" label={badgeText} />
        <h1 style={{ fontFamily: FONT.display, fontSize: 46*s, fontWeight: 700, color: COLORS.accent, lineHeight: 1.05, margin: `0 0 ${20*s}px 0`, textTransform: "uppercase", letterSpacing: 2 }}>{title}</h1>
        <p style={{ color: COLORS.text, fontSize: 15*s, lineHeight: 1.7, margin: `0 0 ${24*s}px 0`, maxWidth: 420*s, opacity: 0.85 }}>{desc}</p>
        <div style={{ display: "flex", gap: 10*s, marginBottom: "auto", flexWrap: "wrap" }}>
          {tagList.map((tag) => (
            <span key={tag} style={{ background: `${COLORS.subtle}88`, border: `1px solid ${COLORS.accent}22`, borderRadius: 20*s, padding: `${6*s}px ${14*s}px`, color: COLORS.text, fontSize: 11*s, fontWeight: 500, opacity: 0.7 }}>{tag}</span>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${COLORS.accent}33`, paddingTop: 12*s, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8*s }}>
            <img src={LOGO_SRC} alt="JJA" style={{ width: 22*s, height: 22*s, borderRadius: "50%" }} />
            <span style={{ color: COLORS.accent, fontSize: 10*s, letterSpacing: 1 }}>#jja1975</span>
          </div>
          <span style={{ color: COLORS.accent, fontSize: 13*s, fontWeight: 600 }}>Pyyhkäise →</span>
        </div>
      </div>
    </div>
  );
}

function CTACard({ headline, ctaText, subText, size = 540 }) {
  const s = size / 540;
  return (
    <div style={{ width: size, height: size, position: "relative", overflow: "hidden", fontFamily: FONT.body, background: `linear-gradient(160deg, ${COLORS.bg1} 0%, ${COLORS.bg2} 60%, ${COLORS.bg1} 100%)` }}>
      <TopBar />
      {/* Decorative large arrow watermark */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: 280*s, opacity: 0.03, color: COLORS.accent, lineHeight: 1 }}>🏹</div>
      {/* Subtle radial glow */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 50%, ${COLORS.accent}08 0%, transparent 70%)` }} />
      <div style={{ position: "relative", padding: `${40*s}px ${50*s}px`, height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        {/* Headline */}
        <p style={{ color: COLORS.text, fontSize: 18*s, lineHeight: 1.6, margin: `0 0 ${32*s}px 0`, maxWidth: 400*s, opacity: 0.85 }}>
          {headline}
        </p>
        {/* CTA button-like element */}
        <div style={{
          background: COLORS.accent,
          borderRadius: 6*s,
          padding: `${14*s}px ${40*s}px`,
          marginBottom: 20*s,
        }}>
          <span style={{ fontFamily: FONT.display, fontSize: 22*s, fontWeight: 700, color: COLORS.bg1, textTransform: "uppercase", letterSpacing: 2 }}>
            {ctaText}
          </span>
        </div>
        {/* Sub text */}
        <p style={{ color: COLORS.textMuted, fontSize: 13*s, margin: 0, maxWidth: 350*s, lineHeight: 1.5 }}>
          {subText}
        </p>
        {/* Footer */}
        <div style={{ position: "absolute", bottom: 24*s, left: 50*s, right: 50*s, borderTop: `1px solid ${COLORS.accent}33`, paddingTop: 10*s, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <img src={LOGO_SRC} alt="JJA" style={{ width: 22*s, height: 22*s, borderRadius: "50%" }} />
          <span style={{ color: COLORS.accent, fontSize: 10*s, letterSpacing: 1 }}>#jja1975</span>
        </div>
      </div>
    </div>
  );
}

// ─── FULLSCREEN OVERLAY ───
function FullscreenOverlay({ children, onClose, label }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#000", display: "flex", flexDirection: "column", alignItems: "center", overflow: "auto", padding: "12px 0" }}>
      <div style={{ marginBottom: 12, display: "flex", gap: 12, alignItems: "center", flexShrink: 0 }}>
        <span style={{ color: COLORS.textMuted, fontSize: 12, fontFamily: FONT.body }}>{label} — ota kuvakaappaus</span>
        <button onClick={onClose} style={{ background: COLORS.accent, color: "#111", border: "none", borderRadius: 6, padding: "8px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: FONT.body }}>✕ Sulje</button>
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

// ═══════════ EDITORS ═══════════

function KilpailuilmoitusEditor() {
  const [fs, setFs] = useState(false);
  const [title, setTitle] = useState("SIMAKISA");
  const [subtitle, setSubtitle] = useState("Sisäkauden päätöskilpailu · Kinkkukisan säännöillä");
  const [date, setDate] = useState("La 25.4.2026");
  const [time, setTime] = useState("klo 15:00 alkaen");
  const [place, setPlace] = useState("Anttilan koulun sali");
  const [price, setPrice] = useState("5 € · Juniorit ilmaiseksi");
  const [badgeText, setBadgeText] = useState("Kilpailukutsu");
  const props = { title, subtitle, date, time, place, price, badgeText };
  return (
    <>
      {fs && <FullscreenOverlay onClose={() => setFs(false)} label="1080×1080"><KilpailuilmoitusCard {...props} size={1080} /></FullscreenOverlay>}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ width: 280 }}>
          <h3 style={{ color: COLORS.accent, fontFamily: FONT.display, fontSize: 16, margin: "0 0 12px", letterSpacing: 1 }}>MUOKKAA</h3>
          <Field label="Badge" value={badgeText} onChange={setBadgeText} />
          <Field label="Otsikko" value={title} onChange={setTitle} />
          <Field label="Alaotsikko" value={subtitle} onChange={setSubtitle} />
          <Field label="Päivämäärä" value={date} onChange={setDate} />
          <Field label="Aika" value={time} onChange={setTime} />
          <Field label="Paikka" value={place} onChange={setPlace} />
          <Field label="Hinta" value={price} onChange={setPrice} />
          <PreviewButton onClick={() => setFs(true)} />
        </div>
        <div><KilpailuilmoitusCard {...props} /></div>
      </div>
    </>
  );
}

function KisatuloksetEditor() {
  const [fs, setFs] = useState(false);
  const [title, setTitle] = useState("KEVÄT FLINT 2026");
  const [info, setInfo] = useState("12.–13.4.2026 · Järvenpää");
  const [n1, setN1] = useState("Matti Meikäläinen"); const [s1, setS1] = useState("Y-sarja"); const [p1, setP1] = useState("287/300");
  const [n2, setN2] = useState("Liisa Virtanen"); const [s2, setS2] = useState("N-sarja"); const [p2, setP2] = useState("279/300");
  const [n3, setN3] = useState("Eemil Korhonen"); const [s3, setS3] = useState("Pi15"); const [p3, setP3] = useState("268/300");
  const results = [
    { place: "🥇", name: n1, series: s1, score: p1, color: COLORS.gold },
    { place: "🥈", name: n2, series: s2, score: p2, color: COLORS.silver },
    { place: "🥉", name: n3, series: s3, score: p3, color: COLORS.bronze },
  ];
  return (
    <>
      {fs && <FullscreenOverlay onClose={() => setFs(false)} label="1080×1080"><KisatuloksetCard title={title} info={info} results={results} size={1080} /></FullscreenOverlay>}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ width: 280 }}>
          <h3 style={{ color: COLORS.accent, fontFamily: FONT.display, fontSize: 16, margin: "0 0 12px", letterSpacing: 1 }}>MUOKKAA</h3>
          <Field label="Kilpailun nimi" value={title} onChange={setTitle} />
          <Field label="Aika ja paikka" value={info} onChange={setInfo} />
          <div style={{ borderTop: "1px solid #333", margin: "8px 0", paddingTop: 6 }}><span style={{ color: COLORS.gold, fontSize: 10, fontWeight: 700 }}>🥇 KULTA</span></div>
          <Field label="Nimi" value={n1} onChange={setN1} /><Field label="Sarja" value={s1} onChange={setS1} /><Field label="Pisteet" value={p1} onChange={setP1} />
          <div style={{ borderTop: "1px solid #333", margin: "8px 0", paddingTop: 6 }}><span style={{ color: COLORS.silver, fontSize: 10, fontWeight: 700 }}>🥈 HOPEA</span></div>
          <Field label="Nimi" value={n2} onChange={setN2} /><Field label="Sarja" value={s2} onChange={setS2} /><Field label="Pisteet" value={p2} onChange={setP2} />
          <div style={{ borderTop: "1px solid #333", margin: "8px 0", paddingTop: 6 }}><span style={{ color: COLORS.bronze, fontSize: 10, fontWeight: 700 }}>🥉 PRONSSI</span></div>
          <Field label="Nimi" value={n3} onChange={setN3} /><Field label="Sarja" value={s3} onChange={setS3} /><Field label="Pisteet" value={p3} onChange={setP3} />
          <PreviewButton onClick={() => setFs(true)} />
        </div>
        <div><KisatuloksetCard title={title} info={info} results={results} /></div>
      </div>
    </>
  );
}

function TiedoteEditor() {
  const [fs, setFs] = useState(false);
  const [title, setTitle] = useState("KESÄKAUSI ALKAA!");
  const [body, setBody] = useState("Ulkorata on nyt avoinna 24/7 kaikille jäsenille. Maastorata avataan toukokuun alussa.");
  const [noteTitle, setNoteTitle] = useState("Muistathan");
  const [noteBody, setNoteBody] = useState("Tarkista välineesi ennen ensimmäistä ulkoammuntaa. Jänneväli ja nuolihylly kannattaa säätää kesäkuntoon!");
  const [badgeText, setBadgeText] = useState("Tiedote");
  const props = { title, body, noteTitle, noteBody, badgeText };
  return (
    <>
      {fs && <FullscreenOverlay onClose={() => setFs(false)} label="1080×1080"><TiedoteCard {...props} size={1080} /></FullscreenOverlay>}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ width: 280 }}>
          <h3 style={{ color: COLORS.accent, fontFamily: FONT.display, fontSize: 16, margin: "0 0 12px", letterSpacing: 1 }}>MUOKKAA</h3>
          <Field label="Badge" value={badgeText} onChange={setBadgeText} />
          <Field label="Otsikko" value={title} onChange={setTitle} />
          <Field label="Teksti" value={body} onChange={setBody} multiline />
          <Field label="Huomiolaatikon otsikko" value={noteTitle} onChange={setNoteTitle} />
          <Field label="Huomiolaatikon teksti" value={noteBody} onChange={setNoteBody} multiline />
          <PreviewButton onClick={() => setFs(true)} />
        </div>
        <div><TiedoteCard {...props} /></div>
      </div>
    </>
  );
}

function TekniikkaEditor() {
  const [fs, setFs] = useState(false);
  const [term, setTerm] = useState("TILLERÖINTI");
  const [eng, setEng] = useState("eng. tiller");
  const [explanation, setExplanation] = useState("Tilleröinti tarkoittaa jousen ylä- ja alakaaren taipuman tasapainottamista. Oikea tilleri varmistaa, että jousi toimii tasaisesti ja nuoli lähtee puhtaasti.");
  const [tip, setTip] = useState("Mittaa tilleri jänteen ja kaaren sisäpinnan välistä molemmista päistä. Erotuksen pitäisi olla jousen valmistajan suosituksen mukainen.");
  const props = { term, eng, explanation, tip };
  return (
    <>
      {fs && <FullscreenOverlay onClose={() => setFs(false)} label="1080×1080"><TekniikkaCard {...props} size={1080} /></FullscreenOverlay>}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ width: 280 }}>
          <h3 style={{ color: COLORS.accent, fontFamily: FONT.display, fontSize: 16, margin: "0 0 12px", letterSpacing: 1 }}>MUOKKAA</h3>
          <Field label="Termi" value={term} onChange={setTerm} />
          <Field label="Englanninkielinen" value={eng} onChange={setEng} />
          <Field label="Selitys" value={explanation} onChange={setExplanation} multiline />
          <Field label="Vinkki" value={tip} onChange={setTip} multiline />
          <PreviewButton onClick={() => setFs(true)} />
        </div>
        <div><TekniikkaCard {...props} /></div>
      </div>
    </>
  );
}

function StoryEditor() {
  const [fs, setFs] = useState(false);
  const [title1, setTitle1] = useState("HUOMENNA");
  const [title2, setTitle2] = useState("DIVARI!");
  const [dateText, setDateText] = useState("Su 19.4. klo 14:30");
  const [placeText, setPlaceText] = useState("Anttilan koulu");
  const [showSwipe, setShowSwipe] = useState(true);
  const props = { title1, title2, dateText, placeText, showSwipe };
  return (
    <>
      {fs && <FullscreenOverlay onClose={() => setFs(false)} label="1080×1920"><StoryCard {...props} w={1080} h={1920} /></FullscreenOverlay>}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ width: 280 }}>
          <h3 style={{ color: COLORS.accent, fontFamily: FONT.display, fontSize: 16, margin: "0 0 12px", letterSpacing: 1 }}>MUOKKAA</h3>
          <Field label="Otsikkorivi 1" value={title1} onChange={setTitle1} />
          <Field label="Otsikkorivi 2" value={title2} onChange={setTitle2} />
          <Field label="Aika" value={dateText} onChange={setDateText} />
          <Field label="Paikka" value={placeText} onChange={setPlaceText} />
          <div style={{ marginBottom: 8 }}>
            <button onClick={() => setShowSwipe(!showSwipe)} style={{
              background: showSwipe ? COLORS.accent : "#1A1A1A", color: showSwipe ? "#111" : "#888",
              border: "1px solid #333", borderRadius: 6, padding: "8px 14px", fontSize: 12, fontWeight: 600,
              cursor: "pointer", fontFamily: FONT.body, width: "100%",
            }}>{showSwipe ? "⌃ LUE LISÄÄ — päällä" : "⌃ LUE LISÄÄ — pois"}</button>
          </div>
          <PreviewButton onClick={() => setFs(true)} label="Täyskoko 1080×1920" />
        </div>
        <div><StoryCard {...props} /></div>
      </div>
    </>
  );
}

function KaruselliEditor() {
  const [fs, setFs] = useState(false);
  const [title, setTitle] = useState("TÄHTÄINJOUSI");
  const [desc, setDesc] = useState("Tekniikkaa ja hienosäätöä. Vakaajat ja klikkeri auttavat vakioimaan suorituksen millilleen. Olympialajin jousi.");
  const [tags, setTags] = useState("Tarkkuus, Tekniikka, Kilpailu");
  const [slideNum, setSlideNum] = useState("01");
  const [badgeText, setBadgeText] = useState("Jousityypit");
  const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean);
  const props = { slideNum, badgeText, title, desc, tagList };
  return (
    <>
      {fs && <FullscreenOverlay onClose={() => setFs(false)} label="1080×1080"><KaruselliCard {...props} size={1080} /></FullscreenOverlay>}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ width: 280 }}>
          <h3 style={{ color: COLORS.accent, fontFamily: FONT.display, fontSize: 16, margin: "0 0 12px", letterSpacing: 1 }}>MUOKKAA</h3>
          <Field label="Slide-numero" value={slideNum} onChange={setSlideNum} />
          <Field label="Badge" value={badgeText} onChange={setBadgeText} />
          <Field label="Otsikko" value={title} onChange={setTitle} />
          <Field label="Kuvaus" value={desc} onChange={setDesc} multiline />
          <Field label="Tagit (pilkulla)" value={tags} onChange={setTags} />
          <PreviewButton onClick={() => setFs(true)} />
        </div>
        <div><KaruselliCard {...props} /></div>
      </div>
    </>
  );
}

function CTAEditor() {
  const [fs, setFs] = useState(false);
  const [headline, setHeadline] = useState("Haluatko nähdä lisää kuvia kauden varrelta?");
  const [ctaText, setCtaText] = useState("Seuraa @jja.1975");
  const [subText, setSubText] = useState("Kilpailuja, tekniikkavinkkejä ja tunnelmia radalta. Tule mukaan!");
  const props = { headline, ctaText, subText };
  return (
    <>
      {fs && <FullscreenOverlay onClose={() => setFs(false)} label="1080×1080"><CTACard {...props} size={1080} /></FullscreenOverlay>}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ width: 280 }}>
          <h3 style={{ color: COLORS.accent, fontFamily: FONT.display, fontSize: 16, margin: "0 0 12px", letterSpacing: 1 }}>MUOKKAA</h3>
          <Field label="Yläotsikko" value={headline} onChange={setHeadline} multiline />
          <Field label="CTA-painikkeen teksti" value={ctaText} onChange={setCtaText} />
          <Field label="Alateksti" value={subText} onChange={setSubText} multiline />
          <PreviewButton onClick={() => setFs(true)} />
          <div style={{ marginTop: 12, padding: "10px 12px", background: "#151515", borderRadius: 6, border: "1px solid #252525" }}>
            <p style={{ color: COLORS.textMuted, fontSize: 10, margin: 0, lineHeight: 1.5 }}>
              💡 Esimerkkejä CTA-teksteiksi:<br />
              • "Seuraa @jja.1975"<br />
              • "Linkki biossa"<br />
              • "Tule kokeilemaan!"<br />
              • "Ilmoittaudu nyt"
            </p>
          </div>
        </div>
        <div><CTACard {...props} /></div>
      </div>
    </>
  );
}

// ═══════════ MAIN ═══════════
export default function Pohjageneraattori() {
  const [active, setActive] = useState(0);
  const tabs = [
    { name: "Kilpailuilmoitus", component: <KilpailuilmoitusEditor /> },
    { name: "Kisatulokset", component: <KisatuloksetEditor /> },
    { name: "Tiedote", component: <TiedoteEditor /> },
    { name: "Tekniikkavinkki", component: <TekniikkaEditor /> },
    { name: "Story", component: <StoryEditor /> },
    { name: "Karuselli", component: <KaruselliEditor /> },
    { name: "CTA-slide", component: <CTAEditor /> },
  ];
  return (
    <>
      {fontLink}
      <div style={{ minHeight: "100vh", background: "#0A0A0A", fontFamily: FONT.body, color: COLORS.text, padding: "24px 12px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h1 style={{ fontFamily: FONT.display, fontSize: 26, fontWeight: 700, color: COLORS.accent, margin: "0 0 4px 0", textTransform: "uppercase", letterSpacing: 2 }}>
            JJA Pohjageneraattori
          </h1>
          <p style={{ color: "#666", fontSize: 12, margin: "0 0 20px 0" }}>
            Muokkaa tekstit → paina Täyskoko → ota kuvakaappaus oikeassa koossa → Instagramiin
          </p>
          <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
            {tabs.map((t, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                background: active === i ? COLORS.accent : "#1A1A1A", color: active === i ? "#111" : "#888",
                border: "none", borderRadius: 6, padding: "8px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: FONT.body,
              }}>{t.name}</button>
            ))}
          </div>
          {tabs[active].component}
          <div style={{ marginTop: 20, padding: "12px 0", borderTop: "1px solid #222" }}>
            <p style={{ color: "#444", fontSize: 10, margin: 0 }}>Feed: 1080×1080px · Story: 1080×1920px · Täyskoko-nappi avaa pohjan oikeassa pikselikoossa</p>
          </div>
        </div>
      </div>
    </>
  );
}
