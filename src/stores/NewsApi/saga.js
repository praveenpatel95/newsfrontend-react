import {call, put, takeLatest, all} from 'redux-saga/effects'
import api from "../../utils/api";
import {
    getNewsAPIArticlesFailure,
    getNewsAPIArticlesSuccess,
} from "./actions";
import {GET_NEWS_API_ARTICLES} from "./constant";

export function* fetchNewsApiArticles({payload}) {
    const token = localStorage.getItem("token");

    try {
        const response = yield call(api(token).get, `/news/search?${payload}`);
        if (response) {
            yield put(getNewsAPIArticlesSuccess(response?.data));
        }
    } catch (e) {
        yield put(getNewsAPIArticlesFailure(e.message));
    }
}
export function* fetchNewsApiArticlesFlow() {
    yield takeLatest(GET_NEWS_API_ARTICLES, fetchNewsApiArticles);
}

export default function* newsAPISaga() {
    yield all([
        fetchNewsApiArticlesFlow(),
    ]);
}