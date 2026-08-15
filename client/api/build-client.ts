import axios from 'axios';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

export default function buildClient(headers: ReadonlyHeaders) {
  if (typeof window === 'undefined') {
    //We are on the server
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: Object.fromEntries(headers),
    });
  } else {
    //We are on the browser
    return axios.create({
      baseURL: '',
    });
  }
}
