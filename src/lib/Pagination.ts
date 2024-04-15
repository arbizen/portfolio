export default class Pagination {
  constructor(
    private readonly params: any,
    private readonly pageName: string,
  ) {}
  async getCurrentPageData() {
    const defaultPage = 1;
    const defaultLimit = 25;

    const cursor = this.params?.nextCursor;
    const page = this.params?.page || defaultPage;
    const limit = this.params?.limit || defaultLimit;
    const category = this.params?.category || '';
    let url;
    if (!cursor) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/api/data/${this.pageName}?page=${page}&limit=${limit}&category=${category}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/api/data/${this.pageName}/${cursor}?page=${page}&limit=${limit}&category=${category}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
  getPaginationUrl(data: any) {
    const defaultLimit = 25;
    let currentPage = this.params?.page || 1;
    const currentLimit = this.params?.limit || defaultLimit;
    const category = this.params?.category || '';
    if (currentPage && currentLimit) {
      let currentTotal = (+currentPage + 1) * +currentLimit;
      //const pageEnd = data[this.pageName]?.end;
      //const hasMore = data[this.pageName]?.has_more;
      let nextCursor = this.params?.nextCursor;
      let nextPageUrl;
      if (currentTotal > 100 || nextCursor) {
        if (currentTotal > 100) {
          currentPage = '0';
          currentTotal = defaultLimit;
          nextCursor = data[this.pageName]?.next_cursor;
        }
        if (data[this.pageName]?.length < defaultLimit) {
          currentTotal = data[this.pageName]?.length;
        }
        nextPageUrl = `/${this.pageName}?&page=${
          Number(currentPage) + 1
        }&nextCursor=${nextCursor}${category ? `&category=${category}` : ''}`;
      } else {
        nextPageUrl = `/${this.pageName}?&page=${Number(currentPage) + 1}${
          category ? `&category=${category}` : ''
        }`;
      }
      return nextPageUrl;
    }
  }
}
