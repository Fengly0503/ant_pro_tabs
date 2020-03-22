import {blogApi} from "@/services/blog";

const remoteUrl = ''

class commonFetch {
  static fetchtData(api, variables) {
    const data = blogApi(api, variables);
    return window.fetch(remoteUrl, {
      method: 'post',
      mode: 'cors',
      headers: {
        authorization: 'Bearer ',
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(
        res => res.json()
          .then(d => d.data),
        (err) => {
          throw err.message;
        },
      );
  }
}

export default commonFetch;
