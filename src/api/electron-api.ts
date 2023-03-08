export interface UserInfo {
  name: string;
}

export interface ElectronApi {
  // openFileDialog: (
  //   title: string,
  //   folder: string,
  //   filters: ElectronFileFilter
  // ) => Promise<string[]>;
  // // getDesktopStream: () => Promise<string[]>;
  // getAllDisplays: () => Promise<string[]>;
  getUserInfo: () => Promise<UserInfo>;
  // test: () => Promise<string[]>;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const electronApi: ElectronApi = (window as { electronApi: ElectronApi })
  .electronApi;
