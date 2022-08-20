import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Route, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo!: string;
  public tituloSubs$!: Subscription;

  constructor( private router: Router ) {

    this.tituloSubs$ = this.getArgsRuta().subscribe(({ title }) => {

      this.titulo = title;
      document.title = `Admin Pro    -< ${title} >-`;
    });
  }

  ngOnDestroy(): void {
     this.tituloSubs$.unsubscribe();
  }

  getArgsRuta() {

    return this.router.events.pipe(
      filter((ev: any) => ev instanceof ActivationEnd),
      filter((ev: ActivationEnd) => ev.snapshot.firstChild === null),
      map((ev: ActivationEnd) => ev.snapshot.data)
    );
  }
}
