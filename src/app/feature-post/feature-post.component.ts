import { Component, OnInit } from '@angular/core';
import { Tile, FeaturePostList, Constants } from '../model/common';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
@Component({
  selector: 'app-feature-post',
  templateUrl: './feature-post.component.html',
  styleUrls: ['./feature-post.component.css'],
})
export class FeaturePostComponent implements OnInit {
  featurePosts!: Tile[];
  show: boolean = false;
  display: boolean = true;
  httpOptions = Constants.httpOptions;
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    let carouselStoriesFlag = localStorage.getItem("featurePostsFlag");
    if (carouselStoriesFlag != null && carouselStoriesFlag != undefined && carouselStoriesFlag == "true") {
      this.featurePosts = JSON.parse(localStorage.getItem('featurePosts'));
      this.show = true;
    } else {
      this.httpClient
        .get<FeaturePostList>(
          environment.service_url + 'feature_posts',
          this.httpOptions
        )
        .subscribe((data) => {
          this.featurePosts = data.stories;
          if (data.stories != undefined && data.stories.length > 0) {
            localStorage.setItem('featurePosts', JSON.stringify(data.stories));
            localStorage.setItem('featurePostsFlag', "true");
            this.show = true;
          } else {
            this.display = false;
          }
        });
    }
  }
}
